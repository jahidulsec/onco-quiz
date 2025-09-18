set -e

echo "1. Install Package"
npm i

echo ""
echo "2. Generate db from prisma"
npx prisma generate

echo ""
echo "3. Build app"
npm run build