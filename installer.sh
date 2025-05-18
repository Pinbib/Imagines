#!/bin/bash

INSTALL_DIR="/usr/local/bin"

echo "🔧 Installing Imagines..."

if [ "$EUID" -ne 0 ]; then
  echo "❗ Need to run as root (via sudo)"
  exit 1
fi

if [ ! -f "./LICENSE" ]; then
  echo "❌ LICENSE file not found. Unable to continue installation."
  exit 1
fi

echo "📝License Agreement:"
echo "------------------------------------------------------------"
cat ./LICENSE | less
echo "------------------------------------------------------------"
read -p "❓ Do you agree to the license terms? [y/N]: " agree
if [[ ! "$agree" =~ ^[Yy]$ ]]; then
  echo "❌ Installation canceled."
  exit 1
fi

install -m 755 "./bin/imagines" "$INSTALL_DIR/ima"
chmod +x /usr/local/bin/ima

echo "✅Installed! Now available as a command: ima"