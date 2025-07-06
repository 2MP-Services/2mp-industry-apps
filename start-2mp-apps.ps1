# start-2mp-apps.ps1
pm2 list
# Backend
cd "C:\Users\Ideal\rh-application\2MP Industry\backend\"
pm2 start "index.js" --name "2mp-rh-backend"

# Frontend
cd "C:\Users\Ideal\rh-application\2MP Industry\frontend\"
pm2 start "server.js" --name "2mp-rh-frontend"

# Admin Frontend
cd "C:\Users\Ideal\rh-application\2MP Industry\admin-frontend\"
pm2 start "server.js" --name "2mp-rh-admin-frontend"

# Tooltastic Library
cd "C:\Users\Ideal\tooltastic-library\"
pm2 start "server.js" --name "2mp-tool-library"
