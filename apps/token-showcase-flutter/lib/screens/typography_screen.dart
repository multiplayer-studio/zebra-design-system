import 'package:flutter/material.dart';
import 'package:zebra_design_system_tokens/typographys_desktop.dart';
import 'package:zebra_design_system_tokens/sizes_desktop.dart';
import 'package:zebra_design_system_tokens/colors_light.dart';

class TypographyScreen extends StatelessWidget {
  const TypographyScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Typography Tokens')),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(SizesDesktop.space_lg),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Typography Tokens',
                style: TypographyDesktop.titleLarge,
              ),
              const SizedBox(height: SizesDesktop.space_sm),
              Text(
                'Typography tokens combine font family, size, weight, line height, and letter spacing. '
                'All values are design tokens, not hardcoded.',
                style: TypographyDesktop.bodySmall.copyWith(
                  color: LightColors.foreground_secondary,
                ),
              ),
              const SizedBox(height: SizesDesktop.space_xl),
              _TypographyGroup(
                title: 'Display',
                styles: {
                  'large': TypographyDesktop.displayLarge,
                  'medium': TypographyDesktop.displayMedium,
                  'small': TypographyDesktop.displaySmall,
                },
              ),
              const SizedBox(height: SizesDesktop.space_xl),
              _TypographyGroup(
                title: 'Heading',
                styles: {
                  'large': TypographyDesktop.headingLarge,
                  'medium': TypographyDesktop.headingMedium,
                  'small': TypographyDesktop.headingSmall,
                },
              ),
              const SizedBox(height: SizesDesktop.space_xl),
              _TypographyGroup(
                title: 'Title',
                styles: {
                  'large': TypographyDesktop.titleLarge,
                  'medium': TypographyDesktop.titleMedium,
                  'small': TypographyDesktop.titleSmall,
                },
              ),
              const SizedBox(height: SizesDesktop.space_xl),
              _TypographyGroup(
                title: 'Body',
                styles: {
                  'large': TypographyDesktop.bodyLarge,
                  'medium': TypographyDesktop.bodyMedium,
                  'small': TypographyDesktop.bodySmall,
                  'xsmall': TypographyDesktop.bodyXsmall,
                },
              ),
              const SizedBox(height: SizesDesktop.space_xl),
              _TypographyGroup(
                title: 'Label',
                styles: {
                  'large': TypographyDesktop.labelLarge,
                  'medium': TypographyDesktop.labelMedium,
                  'small': TypographyDesktop.labelSmall,
                  'indicator': TypographyDesktop.labelIndicator,
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _TypographyGroup extends StatelessWidget {
  final String title;
  final Map<String, TextStyle> styles;

  const _TypographyGroup({
    required this.title,
    required this.styles,
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
        const SizedBox(height: SizesDesktop.space_lg),
        ...styles.entries.map((entry) {
          final weight = entry.value.fontWeight?.value ?? 400;
          return Padding(
            padding: const EdgeInsets.only(bottom: SizesDesktop.space_lg),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'The quick brown fox jumps over the lazy dog',
                  style: entry.value,
                ),
                const SizedBox(height: SizesDesktop.space_sm),
                Text(
                  '${entry.key.toUpperCase()} | '
                  '${(entry.value.fontSize ?? 0).toInt()}px | '
                  'weight $weight | '
                  'line-height ${((entry.value.height ?? 1.0) * (entry.value.fontSize ?? 0)).toInt()}',
                  style: TypographyDesktop.labelSmall.copyWith(
                    fontFamily: 'monospace',
                    color: LightColors.foreground_secondary,
                  ),
                ),
              ],
            ),
          );
        }).toList(),
      ],
    );
  }
}
