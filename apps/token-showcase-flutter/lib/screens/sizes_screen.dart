import 'package:flutter/material.dart';
import 'package:zebra_design_system_tokens/sizes_desktop.dart';
import 'package:zebra_design_system_tokens/typographys_desktop.dart';
import 'package:zebra_design_system_tokens/colors_light.dart';

class SizesScreen extends StatelessWidget {
  const SizesScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Size Tokens')),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(SizesDesktop.space_lg),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Size Tokens',
                style: TypographyDesktop.titleLarge,
              ),
              const SizedBox(height: SizesDesktop.space_sm),
              Text(
                'Size tokens are pixel values and can be used directly in dimensions. '
                'These demonstrate space scales, radius values, and control sizes.',
                style: TypographyDesktop.bodySmall.copyWith(
                  color: LightColors.foreground_secondary,
                ),
              ),
              const SizedBox(height: SizesDesktop.space_xl),
              _SizeGroup(
                title: 'Space Scale',
                description: 'Spacing values for padding and margins.',
                sizes: {
                  '2xs': SizesDesktop.space_2xs,
                  'xs': SizesDesktop.space_xs,
                  'sm': SizesDesktop.space_sm,
                  'md': SizesDesktop.space_md,
                  'lg': SizesDesktop.space_lg,
                  'xl': SizesDesktop.space_xl,
                  '2xl': SizesDesktop.space_2xl,
                },
              ),
              const SizedBox(height: SizesDesktop.space_xl),
              _SizeGroup(
                title: 'Radius Scale',
                description: 'Border radius values.',
                sizes: {
                  'none': SizesDesktop.radius_none,
                  'xs': SizesDesktop.radius_xs,
                  'sm': SizesDesktop.radius_sm,
                  'md': SizesDesktop.radius_md,
                  'lg': SizesDesktop.radius_lg,
                  'xl': SizesDesktop.radius_xl,
                },
                showRadius: true,
              ),
              const SizedBox(height: SizesDesktop.space_xl),
              _SizeGroup(
                title: 'Control Sizes',
                description: 'Tap/click target and control heights.',
                sizes: {
                  'target-min': SizesDesktop.control_target_min,
                  'sm': SizesDesktop.control_sm,
                  'md': SizesDesktop.control_md,
                  'lg': SizesDesktop.control_lg,
                },
                showAsSquares: true,
              ),
              const SizedBox(height: SizesDesktop.space_xl),
              _SizeGroup(
                title: 'Stroke Widths',
                description: 'Border widths.',
                sizes: {
                  'base': SizesDesktop.stroke_base,
                  'thin': SizesDesktop.stroke_thin,
                  'thick': SizesDesktop.stroke_thick,
                  'heavy': SizesDesktop.stroke_heavy,
                },
                showStroke: true,
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _SizeGroup extends StatelessWidget {
  final String title;
  final String description;
  final Map<String, double> sizes;
  final bool showRadius;
  final bool showAsSquares;
  final bool showStroke;

  const _SizeGroup({
    required this.title,
    required this.description,
    required this.sizes,
    this.showRadius = false,
    this.showAsSquares = false,
    this.showStroke = false,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: TypographyDesktop.titleMedium,
        ),
        const SizedBox(height: SizesDesktop.space_sm),
        Text(
          description,
          style: TypographyDesktop.bodyXsmall.copyWith(
            color: LightColors.foreground_secondary,
          ),
        ),
        const SizedBox(height: SizesDesktop.space_lg),
        if (showRadius || showAsSquares || showStroke)
          GridView.count(
            crossAxisCount: 4,
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            mainAxisSpacing: SizesDesktop.space_md,
            crossAxisSpacing: SizesDesktop.space_md,
            children: sizes.entries.map((entry) {
              if (showRadius) {
                return _RadiusBox(
                  label: entry.key,
                  radius: entry.value,
                );
              } else if (showAsSquares) {
                return _SizeBox(
                  label: entry.key,
                  size: entry.value,
                );
              } else if (showStroke) {
                return Column(children: [
                  _StrokeBox(
                    label: entry.key,
                    strokeWidth: entry.value,
                  ),
                  Text(entry.value.toString())
                ]);
              }
              return const SizedBox.shrink();
            }).toList(),
          )
        else
          ...sizes.entries.map((entry) {
            return Padding(
              padding: const EdgeInsets.only(bottom: SizesDesktop.space_md),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(
                    height: SizesDesktop.space_sm,
                    child: Container(
                      width: entry.value * 4,
                      decoration: BoxDecoration(
                        color: LightColors.foreground_link,
                        borderRadius: BorderRadius.circular(SizesDesktop.radius_xs),
                      ),
                    ),
                  ),
                  const SizedBox(height: SizesDesktop.space_sm),
                  Text(
                    '${entry.key}: ${entry.value.toInt()}px',
                    style: TypographyDesktop.labelSmall,
                  ),
                ],
              ),
            );
          }).toList(),
      ],
    );
  }
}

class _RadiusBox extends StatelessWidget {
  final String label;
  final double radius;

  const _RadiusBox({
    required this.label,
    required this.radius,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Expanded(
          child: Container(
            decoration: BoxDecoration(
              color: LightColors.border_subtle,
              borderRadius: BorderRadius.circular(radius),
            ),
          ),
        ),
        const SizedBox(height: SizesDesktop.space_sm),
        Text(
          label,
          style: TypographyDesktop.labelSmall,
          textAlign: TextAlign.center,
        ),
      ],
    );
  }
}

class _SizeBox extends StatelessWidget {
  final String label;
  final double size;

  const _SizeBox({
    required this.label,
    required this.size,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Container(
          width: size,
          height: size,
          decoration: BoxDecoration(
            color: LightColors.foreground_link,
            borderRadius: BorderRadius.circular(SizesDesktop.radius_sm),
          ),
        ),
        const SizedBox(height: SizesDesktop.space_sm),
        Text(
          label,
          style: TypographyDesktop.labelSmall,
          textAlign: TextAlign.center,
        ),
      ],
    );
  }
}

class _StrokeBox extends StatelessWidget {
  final String label;
  final double strokeWidth;

  const _StrokeBox({
    required this.label,
    required this.strokeWidth,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Container(
          width: SizesDesktop.control_md,
          height: SizesDesktop.control_md,
          decoration: BoxDecoration(
            border: Border.all(
              color: LightColors.foreground_link,
              width: strokeWidth,
            ),
            borderRadius: BorderRadius.circular(SizesDesktop.radius_sm),
          ),
        ),
        const SizedBox(height: SizesDesktop.space_sm),
        Text(
          label,
          style: TypographyDesktop.labelSmall,
          textAlign: TextAlign.center,
        ),
      ],
    );
  }
}
