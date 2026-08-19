import * as fs from 'fs';
import * as path from 'path';
import { TOKEN_DIR, TEMP_DIR, FLUTTER_BB_DIR } from './constants.ts';
import { dashToPascal } from './dart-helpers.ts';
import { compileTokens, getSourceFilesForCollection, type FlutterFileTarget } from './compile-tokens.ts';
import { synthesizeBuildingBlockCss } from './building-block-css-synthesizer.ts';
import { synthesizeBuildingBlockJs } from './building-block-js-synthesizer.ts';

type BuildingBlockDefKey = 'primitives' | 'palette' | 'size' | 'typography';

type BuildingBlockDef = {
  interfaceName: string;
  needsMaterialImport: boolean;
  implSubdir: string;
  ctorParam?: { name: string; type: string; importPath: string };
};

const BUILDING_BLOCK_DEFS: Record<BuildingBlockDefKey, BuildingBlockDef> = {
  primitives: {
    interfaceName: 'PrimitivesTokens',
    needsMaterialImport: true,
    implSubdir: 'primitives',
  },
  palette: {
    interfaceName: 'PaletteTokens',
    needsMaterialImport: true,
    implSubdir: 'palette',
    ctorParam: { name: 'primitives', type: 'PrimitivesTokens', importPath: '../primitives_tokens.dart' },
  },
  size: {
    interfaceName: 'SizeTokens',
    needsMaterialImport: false,
    implSubdir: 'size',
    ctorParam: { name: 'primitives', type: 'PrimitivesTokens', importPath: '../primitives_tokens.dart' },
  },
  typography: {
    interfaceName: 'TypographyTokens',
    needsMaterialImport: false,
    implSubdir: 'typography',
    ctorParam: { name: 'primitives', type: 'PrimitivesTokens', importPath: '../primitives_tokens.dart' },
  },
};

function flutterBuildingBlockTargets(
  defKey: BuildingBlockDefKey,
  theme: string,
  filterName: string,
  opts: { writeInterface?: boolean; modeSuffix?: string } = {},
): FlutterFileTarget[] {
  const def = BUILDING_BLOCK_DEFS[defKey];
  const modeSuffixSafe = opts.modeSuffix?.replace(/\s+/g, '_');
  const className = `${dashToPascal(defKey)}${dashToPascal(theme)}${modeSuffixSafe ? dashToPascal(modeSuffixSafe) : ''}`;
  const fileBase = modeSuffixSafe ? `${theme}_${modeSuffixSafe}` : theme;

  const targets: FlutterFileTarget[] = [{
    destination: path.join(FLUTTER_BB_DIR, def.implSubdir, `${fileBase}.dart`),
    format: 'flutter/bb-impl',
    filter: filterName,
    options: {
      interfaceName: def.interfaceName,
      interfaceImportPath: `../${defKey}_tokens.dart`,
      className,
      needsMaterialImport: def.needsMaterialImport,
      ctorParamName: def.ctorParam?.name,
      ctorParamType: def.ctorParam?.type,
      ctorParamImportPath: def.ctorParam?.importPath,
    },
  }];

  if (opts.writeInterface) {
    targets.push({
      destination: path.join(FLUTTER_BB_DIR, `${defKey}_tokens.dart`),
      format: 'flutter/bb-interface',
      filter: filterName,
      options: { interfaceName: def.interfaceName, needsMaterialImport: def.needsMaterialImport },
    });
  }
  return targets;
}

export async function compilePrimitivesBuildingBlock(theme: string) {
  if (theme !== 'default' && !fs.existsSync(path.join(TOKEN_DIR, `primitives-${theme}-value.json`))) {
    console.log(`   - Skipping primitives building block for theme '${theme}' (no override found).`);
    return;
  }
  try {
    const sources = getSourceFilesForCollection('primitives', theme, 'value');
    await compileTokens(sources, path.join(TEMP_DIR, `${theme}-bb-primitives.css`), {
      filter: 'primitivesOnlyFilter',
      outputReferences: true,
      flutter: flutterBuildingBlockTargets('primitives', theme, 'primitivesOnlyFilter', { writeInterface: theme === 'default' }),
    });
  } catch (error) {
    console.warn(`    - ⚠️  Building-block compilation failed for primitives in theme '${theme}'.`);
    return;
  }
  synthesizeBuildingBlockCss(theme, 'primitives');
  synthesizeBuildingBlockJs(theme, 'primitives');
}

export async function compileModeBuildingBlock(defKey: 'palette' | 'size' | 'typography', modes: readonly string[], theme: string) {
  if (theme !== 'default' && !modes.some(mode => fs.existsSync(path.join(TOKEN_DIR, `${defKey}-${theme}-${mode}.json`)))) {
    console.log(`   - Skipping ${defKey} building block for theme '${theme}' (no override found).`);
    return;
  }
  const filterName = `${defKey}OnlyFilter`;
  const def = BUILDING_BLOCK_DEFS[defKey];
  for (const mode of modes) {
    try {
      const sources = [
        ...getSourceFilesForCollection('primitives', theme, 'value'),
        ...getSourceFilesForCollection(defKey, theme, mode),
      ];
      await compileTokens(sources, path.join(TEMP_DIR, `${theme}-${mode}-bb-${defKey}.css`), {
        filter: filterName,
        outputReferences: true,
        javascriptCtorParam: def.ctorParam?.name,
        flutter: flutterBuildingBlockTargets(defKey, theme, filterName, {
          writeInterface: theme === 'default' && mode === modes[0],
          modeSuffix: mode,
        }),
      });
    } catch (error) {
      console.warn(`    - ⚠️  Building-block compilation failed for ${defKey} mode '${mode}' in theme '${theme}'.`);
    }
  }
  synthesizeBuildingBlockCss(theme, defKey);
  synthesizeBuildingBlockJs(theme, defKey);
}

export async function compileSemanticsBuildingBlock() {
  try {
    const sources = [
      ...getSourceFilesForCollection('primitives', 'default', 'value'),
      ...getSourceFilesForCollection('palette', 'default', 'light'),
      ...getSourceFilesForCollection('semantics', 'default', 'base'),
    ];
    await compileTokens(sources, path.join(TEMP_DIR, `default-bb-semantics.css`), {
      filter: 'semanticsOnlyFilter',
      outputReferences: true,
      javascriptCtorParam: 'palette',
      flutter: [
        {
          destination: path.join(FLUTTER_BB_DIR, 'semantics_tokens.dart'),
          format: 'flutter/bb-interface',
          filter: 'semanticsOnlyFilter',
          options: { interfaceName: 'SemanticsTokens', needsMaterialImport: true },
        },
        {
          destination: path.join(FLUTTER_BB_DIR, 'semantics_default.dart'),
          format: 'flutter/bb-impl',
          filter: 'semanticsOnlyFilter',
          options: {
            interfaceName: 'SemanticsTokens',
            interfaceImportPath: 'semantics_tokens.dart',
            className: 'SemanticsDefault',
            needsMaterialImport: true,
            ctorParamName: 'palette',
            ctorParamType: 'PaletteTokens',
            ctorParamImportPath: 'palette_tokens.dart',
          },
        },
      ],
    });
  } catch (error) {
    console.warn(`    - ⚠️  Building-block compilation failed for semantics.`);
    return;
  }
  synthesizeBuildingBlockCss('default', 'semantics');
  synthesizeBuildingBlockJs('default', 'semantics');
}
