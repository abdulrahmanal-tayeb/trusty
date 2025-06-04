import 'package:flutter/material.dart';

class Scaffoldwidget extends StatefulWidget {
  final PreferredSizeWidget? appBar;
  final Widget? bottomAppBar;
  final Widget? body;
  const Scaffoldwidget({super.key, this.body, this.appBar, this.bottomAppBar});

  @override
  State<Scaffoldwidget> createState() => _ScaffoldwidgetState();
}


class _ScaffoldwidgetState extends State<Scaffoldwidget> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: widget.appBar,
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      body: widget.body,
      bottomNavigationBar: widget.bottomAppBar,
    );
  }
}
