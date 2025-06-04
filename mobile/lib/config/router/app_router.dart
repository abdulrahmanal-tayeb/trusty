import 'package:go_router/go_router.dart';
import 'package:trusty/features/home/presentation/screens/home_screen.dart';
import 'package:trusty/features/humanizer/presentation/screens/analysis_screen.dart';

final appRouter = GoRouter(
  initialLocation: "/",
  routes: [
    GoRoute(
      path: "/",
      name: "home",
      builder: (context, state) => HomeScreen()
    ),
    GoRoute(
      path: "/analysis",
      name: "analysis",
      builder: (context, state) => AnalysisScreen()
    ),
  ]
);