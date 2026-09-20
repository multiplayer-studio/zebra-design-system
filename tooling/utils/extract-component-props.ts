import { Project } from "ts-morph";
import * as path from "path";
import * as fs from "fs";
import { fileURLToPath } from "url";

interface ComponentProp {
  name: string;
  type: string;
  jsdoc: string | null;
  defaultValue?: string;
}

export function getComponentProps(componentPath: string): ComponentProp[] {
  const project = new Project();

  const sourceFile = project.addSourceFileAtPath(componentPath);
  const props: ComponentProp[] = [];

  // Find the component class
  const classDecl = sourceFile.getClasses().find((c) => {
    const name = c.getName();
    return name && (name.includes("Zeta") || name.includes("Button"));
  });

  if (!classDecl) {
    console.warn(`No Zeta component class found in ${componentPath}`);
    return props;
  }

  // Extract @property decorated fields
  classDecl.getProperties().forEach((prop) => {
    const decorators = prop.getDecorators();
    const hasPropertyDecorator = decorators.some((d) =>
      d.getName() === "property"
    );

    if (hasPropertyDecorator) {
      const jsdocs = prop.getJsDocs();
      const jsdocText = jsdocs[0]?.getDescription() || null;

      props.push({
        name: prop.getName(),
        type: prop.getType().getText(),
        jsdoc: jsdocText,
        defaultValue: prop.getInitializer()?.getText(),
      });
    }
  });

  return props;
}

// CLI usage
if (fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const componentPath = process.argv[2];

  if (!componentPath) {
    console.error(
      "Usage: pnpm extract:props <path-to-component>"
    );
    console.error(
      "Example: pnpm extract:props packages/zeta-web/src/components/button/button.ts"
    );
    process.exit(1);
  }

  const props = getComponentProps(componentPath);
  console.log(JSON.stringify(props, null, 2));
}
