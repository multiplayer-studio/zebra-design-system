import 'package:flutter/material.dart';
import 'package:zebra_design_system_tokens/colors_light.dart';
import 'package:zebra_design_system_tokens/sizes_mobile.dart';
import 'package:zebra_design_system_tokens/typographys_mobile.dart';

class ColorsScreen extends StatelessWidget {
  const ColorsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Color Tokens')),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(SizesMobile.space_lg),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _ColorGroup(
                title: 'Surface Colors',
                description: 'Background colors for pages, containers, and overlays.',
                colors: {
                  'page': LightColors.surface_page,
                  'section': LightColors.surface_section,
                  'card': LightColors.surface_card,
                  'dialog': LightColors.surface_dialog,
                  'sheet': LightColors.surface_sheet,
                  'popover': LightColors.surface_popover,
                  'tooltip': LightColors.surface_tooltip,
                  'brand': LightColors.surface_brand,
                  'inverse': LightColors.surface_inverse,
                  'success': LightColors.surface_success,
                  'warning': LightColors.surface_warning,
                  'error': LightColors.surface_error,
                  'info': LightColors.surface_info,
                },
              ),
              const SizedBox(height: SizesMobile.space_xl),
              _ColorGroup(
                title: 'Foreground Colors',
                description: 'Text and icon colors.',
                colors: {
                  'primary': LightColors.foreground_primary,
                  'secondary': LightColors.foreground_secondary,
                  'tertiary': LightColors.foreground_tertiary,
                  'disabled': LightColors.foreground_disabled,
                  'inverse': LightColors.foreground_inverse,
                  'link': LightColors.foreground_link,
                  'cursor': LightColors.foreground_cursor,
                  'success': LightColors.foreground_success,
                  'warning': LightColors.foreground_warning,
                  'error': LightColors.foreground_error,
                  'info': LightColors.foreground_info,
                },
              ),
              const SizedBox(height: SizesMobile.space_xl),
              _ColorGroup(
                title: 'Border Colors',
                description: 'Border and divider colors.',
                colors: {
                  'default': LightColors.border_default,
                  'subtle': LightColors.border_subtle,
                  'strong': LightColors.border_strong,
                  'focus': LightColors.border_focus,
                  'success': LightColors.border_success,
                  'warning': LightColors.border_warning,
                  'error': LightColors.border_error,
                  'info': LightColors.border_info,
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _ColorGroup extends StatelessWidget {
  final String title;
  final String description;
  final Map<String, Color> colors;

  const _ColorGroup({
    required this.title,
    required this.description,
    required this.colors,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: TypographyMobile.titleLarge,
        ),
        const SizedBox(height: SizesMobile.space_sm),
        Text(
          description,
          style: TypographyMobile.bodySmall.copyWith(
            color: LightColors.foreground_secondary,
          ),
        ),
        const SizedBox(height: SizesMobile.space_lg),
        GridView.count(
          crossAxisCount: 2,
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          mainAxisSpacing: SizesMobile.space_md,
          crossAxisSpacing: SizesMobile.space_md,
          children: colors.entries.map((entry) {
            return _ColorSwatch(
              label: entry.key,
              color: entry.value,
            );
          }).toList(),
        ),
      ],
    );
  }
}

class _ColorSwatch extends StatelessWidget {
  final String label;
  final Color color;

  const _ColorSwatch({
    required this.label,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Expanded(
          child: Container(
            width: double.infinity,
            decoration: BoxDecoration(
              color: color,
              border: Border.all(color: LightColors.border_subtle),
              borderRadius: BorderRadius.circular(SizesMobile.radius_md),
            ),
          ),
        ),
        const SizedBox(height: SizesMobile.space_sm),
        Text(
          label,
          style: TypographyMobile.labelSmall,
          maxLines: 1,
          overflow: TextOverflow.ellipsis,
        ),
      ],
    );
  }
}
