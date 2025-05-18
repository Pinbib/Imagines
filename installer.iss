[Setup]
AppName=Imagines
AppVersion=0.0.3
DefaultDirName={pf}\Imagines
DefaultGroupName=Imagines
AppPublisher=PinBib
AppPublisherURL=https://github.com/Pinbib/imagines
AppSupportURL=https://github.com/Pinbib/imagines
AppUpdatesURL=https://github.com/Pinbib/imagines
AppComments=CLI utility for writing and reading steganography from images (as well as running code that has been written in the same way)
LicenseFile=LICENSE
OutputDir=.\installer
OutputBaseFilename=Imagines Setup
Compression=lzma
SolidCompression=yes

[Files]
Source: "bin\imagines.exe"; DestName: "ima.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "LICENSE"; DestDir: "{app}"; Flags: ignoreversion


[Dirs]
Name: "{app}"; Permissions: users-full

[Icons]
Name: "{group}\Uninstall Imagines"; Filename: "{uninstallexe}"

[Registry]
Root: HKCU; Subkey: "Environment"; ValueType: string; ValueName: "Path"; ValueData: "{olddata};{app}";