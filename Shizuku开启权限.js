// 使用前，需要启动Shizuku

/* 启用 AutoJs6 "无障碍服务". */
shizuku('settings put secure enabled_accessibility_services org.autojs.autojs6/org.autojs.autojs.core.accessibility.AccessibilityServiceUsher');

// 授予媒体投影权限（屏幕捕获的基础权限）
shizuku('appops set org.autojs.autojs6 PROJECT_MEDIA allow');

// 授予屏幕截图权限
// shizuku('pm grant org.autojs.autojs6 android.permission.CAPTURE_SECURE_VIDEO_OUTPUT');

// 授予悬浮窗权限
shizuku('appops set org.autojs.autojs6 SYSTEM_ALERT_WINDOW allow');
