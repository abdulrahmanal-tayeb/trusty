# Flutter wrapper
-keep class io.flutter.** { *; }
-keep class io.flutter.plugins.** { *; }

# Keep Play Core classes used by Flutter for deferred components
-keep class com.google.android.play.core.** { *; }
-dontwarn com.google.android.play.core.**

# Prevent Flutter plugin registrant class from being removed
-keep class com.amtcode.ygc_reports.MainActivity { *; }

# Required for reflection used by some plugins
-keepattributes *Annotation*

# Needed for PDF rendering and creation
-keep class com.itextpdf.** { *; }
-keep class org.apache.pdfbox.** { *; }
-keep class net.sf.saxon.** { *; }

# For pdf_render and flutter_pdfview
-keep class com.github.barteksc.** { *; }
-keep class com.shockwave.pdfium.** { *; }
-dontwarn com.shockwave.**

# For printing
-keep class android.print.** { *; }
-keep class android.printservice.** { *; }

# For permission_handler
-keep class com.baseflow.permissionhandler.** { *; }
-dontwarn com.baseflow.permissionhandler.**

# For share_plus
-keep class dev.fluttercommunity.plus.share.** { *; }

# For open_filex
-keep class com.crazecoder.openfile.** { *; }

# For qr_flutter
-keep class com.google.zxing.** { *; }
-dontwarn com.google.zxing.**

# For flutter_svg (uses android.graphics and parsing)
-keep class android.graphics.** { *; }

# For url_launcher
-keep class io.flutter.plugins.urllauncher.** { *; }

# General support for reflection-based code
-keep class androidx.core.** { *; }
-keep class androidx.lifecycle.** { *; }

# Don't strip Serializable classes (e.g. if you're using them in DB or storage)
-keepnames class * implements java.io.Serializable

# Keep annotations and method/field names (safe default for Flutter + Android plugins)
-keepclassmembers class * {
    @androidx.annotation.Keep *;
}
-keep @androidx.annotation.Keep class * { *; }

# Optional: Reduce warnings
-dontwarn org.codehaus.mojo.**
-dontwarn kotlin.**

# Optional: Improve readability in crash logs (won't obfuscate method names)
-renamesourcefileattribute SourceFile
-keepattributes SourceFile,LineNumberTable