#!/bin/sh

function failed {
    echo "$(tput setaf 1)$@$(tput sgr0)"
    echo -e "\nFailed to install. Please visit https://github.com/shikhir-arora/karma-simple/issues.\n"
    exit 1
}

echo ""
echo "Karma Bot Installer - Starting.."

if hash git 1>/dev/null 2>&1
then
    echo ""
    echo "Git is installed on this system."
else
    echo ""    
    echo "Git is not installed on this system. Please install Git."
    exit 1
fi

if hash node 1>/dev/null 2>&1
then
    echo ""
    echo "Node.js is installed on this system."
else
    echo ""    
    echo "Node.js is not installed on this system. Please install Node.js."
    exit 1
fi


echo ""
echo "Downloading KarmaBot, please wait."
git clone --recursive --depth 1 https://github.com/shikhir-arora/karma-simple.git || failed "Cannot install. Ensure you have permissions!"
echo ""
echo "KarmaBot downloaded!"


[[ -d karma-simple ]] || failed "Could not find the karma-simple folder!"
cd karma-simple || failed "Could not enter the karma-simple folder - please check permissions!"

echo ""
echo "Downloading KarmaBot dependencies"
npm install -g || failed "Could not download the karma-simple node packages - please check permissions!"

echo ""
echo "Installation Complete. Please edit config.json.example and save as config.json"
echo "To start the bot, use node karma.js or set up pm2/tmux to simplify things later - please see the readme!"
exit 0

