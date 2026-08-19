import 'package:flutter/material.dart';
import 'screens/home_screen.dart';

void main() {
  runApp(const TokenShowcaseApp());
}

class TokenShowcaseApp extends StatelessWidget {
  const TokenShowcaseApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Zebra Design Tokens',
      theme: ThemeData(
        brightness: Brightness.light,
      ),
      home: const HomeScreen(),
    );
  }
}
