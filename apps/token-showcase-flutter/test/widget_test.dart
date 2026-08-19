import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:token_showcase_flutter/main.dart';

void main() {
  testWidgets('Token showcase app loads', (WidgetTester tester) async {
    await tester.pumpWidget(const TokenShowcaseApp());

    expect(find.text('Zebra Design Tokens'), findsOneWidget);
    expect(find.text('Token Showcase'), findsOneWidget);
    expect(find.byType(ElevatedButton), findsWidgets);
  });
}
