# ZM STORE


# Development
- Configure Android Emulator to access localhost     
`adb -s <device_name> reverse tcp:backend_port tcp:backend_port`    
E.g `adb -s emulator-5554 reverse tcp:4000 tcp:4000`