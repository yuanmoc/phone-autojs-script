// 使用前，需要启动Shizuku

/* 启用 AutoJs6 "无障碍服务". */
shizuku('settings put secure enabled_accessibility_services org.autojs.autojs6/org.autojs.autojs.core.accessibility.AccessibilityServiceUsher');

// 授予媒体投影权限（屏幕捕获的基础权限）
shizuku('appops set org.autojs.autojs6 PROJECT_MEDIA allow');

// 授予屏幕截图权限
// shizuku('pm grant org.autojs.autojs6 android.permission.CAPTURE_SECURE_VIDEO_OUTPUT');

// 授予悬浮窗权限
shizuku('appops set org.autojs.autojs6 SYSTEM_ALERT_WINDOW allow');

// 授予忽略电池优化权限 (需要替换 org.autojs.autojs6 为实际的应用包名)
// 注意：此命令可能需要Shizuku以root权限运行，或者在某些设备上可能无效。
// 建议在Shizuku应用中手动添加应用到“不优化”列表，以确保后台运行。
shizuku('dumpsys deviceidle whitelist +org.autojs.autojs6');

// 授予修改系统设置权限 (WRITE_SETTINGS)
// AutoJs6 默认可能不直接支持此权限的 shizuku 命令，通常需要通过 appops 或 pm grant。
// 如果需要修改系统设置，例如屏幕亮度、音量等，可能需要此权限。
// shizuku('pm grant org.autojs.autojs6 android.permission.WRITE_SETTINGS');
// 或者通过 appops 设置：
shizuku('appops set org.autojs.autojs6 WRITE_SETTINGS allow');

// 关于自启动权限、忽略后台活动限制和系统多任务保留：
// 注意⚠️：定时任务需要这个权限，有时不生效，需要重新开启一下这个配置