import 'package:flutter/material.dart';
import 'package:zebra_design_system_tokens/typographys_mobile.dart';
import 'package:zebra_design_system_tokens/sizes_mobile.dart';
import 'package:zebra_design_system_tokens/colors_light.dart';
import 'colors_screen.dart';
import 'typography_screen.dart';
import 'sizes_screen.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Zebra Design Tokens'),
        elevation: 0,
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(SizesMobile.space_lg),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Token Showcase',
                style: TypographyMobile.headingLarge,
              ),
              const SizedBox(height: SizesMobile.space_sm),
              Text(
                'This app demonstrates Zebra Design System tokens implemented in Flutter. '
                'All colors, sizes, and typography values below are design tokens, not hardcoded values.',
                style: TypographyMobile.bodySmall.copyWith(
                  color: LightColors.foreground_secondary,
                ),
              ),
              const SizedBox(height: SizesMobile.space_xl),
              _NavButton(
                label: 'Color Tokens',
                onPressed: () {
                  Navigator.of(context).push(
                    MaterialPageRoute(builder: (_) => const ColorsScreen()),
                  );
                },
              ),
              const SizedBox(height: SizesMobile.space_md),
              _NavButton(
                label: 'Typography Tokens',
                onPressed: () {
                  Navigator.of(context).push(
                    MaterialPageRoute(builder: (_) => const TypographyScreen()),
                  );
                },
              ),
              const SizedBox(height: SizesMobile.space_md),
              _NavButton(
                label: 'Size Tokens',
                onPressed: () {
                  Navigator.of(context).push(
                    MaterialPageRoute(builder: (_) => const SizesScreen()),
                  );
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _NavButton extends StatelessWidget {
  final String label;
  final VoidCallback onPressed;

  const _NavButton({
    required this.label,
    required this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      child: ElevatedButton(
        onPressed: onPressed,
        style: ElevatedButton.styleFrom(
          padding: const EdgeInsets.symmetric(vertical: SizesMobile.space_lg),
        ),
        child: Text(label),
      ),
    );
  }
}
