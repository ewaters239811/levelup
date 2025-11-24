# MongoDB Connection String

## ✅ Your Connection String

Vercel gave you:
```
MONGODB_URI="mongodb+srv://Vercel-Admin-userdata:ZCHuTjoiwDgcTg1q@userdata.2ayzgrm.mongodb.net/?retryWrites=true&w=majority"
```

## 🔧 Update It

Add the database name `/userdata` before the `?`:

**Correct format:**
```
MONGODB_URI="mongodb+srv://Vercel-Admin-userdata:ZCHuTjoiwDgcTg1q@userdata.2ayzgrm.mongodb.net/userdata?retryWrites=true&w=majority"
```

Notice: `/userdata` added before `?retryWrites`

## 📝 Update in Vercel

1. Go to: https://vercel.com/dashboard
2. Your project → **Settings** → **Environment Variables**
3. Find `MONGODB_URI`
4. Click **Edit**
5. Update to include `/userdata`:
   ```
   mongodb+srv://Vercel-Admin-userdata:ZCHuTjoiwDgcTg1q@userdata.2ayzgrm.mongodb.net/userdata?retryWrites=true&w=majority
   ```
6. Click **Save**
7. **Redeploy** your project (or it will auto-deploy on next push)

## ✅ Test It

After updating:
1. Complete the quiz on your site
2. Enter an email
3. Visit: `https://yourdomain.com/admin`
4. You should see the email in the list!

---

**Note:** The code already specifies `userdata` database, but having it in the connection string is best practice and ensures consistency.

