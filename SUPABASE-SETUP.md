# 🚀 Supabase Setup Guide - Bite&Bed

## Step 1: Create Supabase Project ✅
1. Go to https://supabase.com
2. Sign up / Log in
3. Click "New Project"
4. Fill in:
   - Name: `bitebed`
   - Database Password: (save this!)
   - Region: Choose closest to you
5. Wait ~2 minutes for provisioning

## Step 2: Run Database Schema (5 mins)

1. In Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click **"New Query"**
3. Copy the contents of `supabase-schema.sql` 
4. Paste into the query editor
5. Click **"Run"** (or press Ctrl/Cmd + Enter)
6. You should see: "Success. No rows returned"

## Step 3: Seed Your Data (2 mins)

1. Still in **SQL Editor**, create another **New Query**
2. Copy the contents of `supabase-seed.sql`
3. Paste and click **"Run"**
4. You should see: "Success. 7 rows returned" (3 meals + 4 experiences)

## Step 4: Get Your API Keys (1 min)

1. Go to **Settings** → **API** (left sidebar)
2. Copy these TWO values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (long string starting with `eyJ...`)

## Step 5: Add Keys to Your Project (2 mins)

1. In VS Code, create a new file: `.env.local`
2. Add these lines (replace with YOUR actual values):

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

3. Save the file
4. **IMPORTANT:** Add `.env.local` to `.gitignore` (don't commit secrets!)

## Step 6: Verify It Works (2 mins)

1. In your terminal, run:
```bash
npm run dev
```

2. Open http://localhost:5174
3. Go to **/meals** or **/experiences**
4. You should see the data loading from Supabase!

## Step 7: Enable Authentication (2 mins)

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. **Email** should already be enabled (default)
3. Optional: Enable **Google**, **GitHub**, etc. for social login

## Step 8: Test Sign Up/Login

1. Go to your app: http://localhost:5174/signup
2. Create a test account
3. Check Supabase dashboard → **Authentication** → **Users**
4. You should see your new user!

---

## 🎉 You're Done!

Your app now has:
- ✅ Real database (PostgreSQL)
- ✅ Auto-generated REST API
- ✅ Authentication system
- ✅ User management
- ✅ Row-level security

---

## 🚀 Next: Deploy to Vercel

1. Push code to GitHub:
```bash
git add .
git commit -m "Add Supabase integration"
git push
```

2. Go to https://vercel.com
3. Click "New Project"
4. Import your GitHub repo
5. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Click "Deploy"

**Your app will be live in 2 minutes!** 🎉

---

## 📝 Troubleshooting

### "Cannot read properties of undefined"
- Check `.env.local` file exists
- Restart dev server after adding env vars
- Make sure variables start with `VITE_`

### "No data showing"
- Check Supabase SQL Editor for data
- Open browser console (F12) for errors
- Verify API keys are correct

### "Auth errors"
- Check Authentication is enabled in Supabase
- Verify RLS policies are created (from schema.sql)

---

## 🔗 Useful Links

- **Supabase Dashboard:** https://supabase.com/dashboard
- **Supabase Docs:** https://supabase.com/docs
- **Your Project:** https://supabase.com/dashboard/project/YOUR_PROJECT

Need help? Let me know! 🚀
