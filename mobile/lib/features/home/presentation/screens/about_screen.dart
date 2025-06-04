import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:url_launcher/url_launcher.dart';

class AboutScreen extends StatelessWidget {
  const AboutScreen({super.key});

  void openInBrowser() async {
    final Uri uri = Uri.parse("https://amtcode.com");
    if (await canLaunchUrl(uri)) {
      await launchUrl(
        uri,
        mode: LaunchMode.externalApplication,
      );
    } else {
      throw 'Could not launch https://amtcode.com';
    }
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: GestureDetector(
        onTap: openInBrowser,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            SvgPicture.asset(
              'assets/logos/logo.svg',
              height: 50,
              width: 50,
              semanticsLabel: 'Logo',
            ),
            Text("From AmtCode")
          ],
        ),
      )
    );
  }
}