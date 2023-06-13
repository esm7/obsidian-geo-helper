set -e

# --- Android ---
# This is important because the 'production' build is meant for Github Pages
NODE_ENV=development npm run build
npx cap sync
cd android
JAVA_HOME=/opt/android-studio/jbr ./gradlew build -x lint
cd ..
cp android/app/build/outputs/apk/debug/*.apk build/

# --- Github Pages ---
# npm run build
# cp -r build/* docs/
