import 'package:flutter/material.dart';
import 'package:trusty/features/home/presentation/screens/about_screen.dart';
import 'package:trusty/features/humanizer/presentation/screens/humanizer_screen.dart';
import 'package:trusty/widgets/layout/bottom_app_bar_widget.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _currentIndex = 0;
  @override
  Widget build(BuildContext context) {

    final List<Widget> _pages = const [
      HumanizerScreen(),
      AboutScreen(),
      // Center(child: Text('Favorites')),
      // Center(child: Text('Profile')),
    ];

    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      body: _pages[_currentIndex],
      bottomNavigationBar: BottomAppBarWidget(
        activeIndex: _currentIndex, 
        onTabChange: (index) {
          setState(() {
            _currentIndex = index;
          });
        }
      ),
    );
  }
}