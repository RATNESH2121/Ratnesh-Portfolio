# 🚀 Vercel Deployment Guide

Follow these steps to deploy your portfolio live on Vercel.

## Why Unified Deployment?
Because of the **[vercel.json](file:///c:/Users/asus/OneDrive/Desktop/Portfolio1/Portfolio/vercel.json)** file I created in your root directory, Vercel will handle **both** your frontend and backend as a single project. 

- Your frontend will be built and served normally.
- Your backend will automatically run as a serverless function.
- All requests to `/api/*` will be routed to your backend automatically.

This is much easier than deploying two separate projects because you only have one set of environment variables to manage!

## 1. Connect to GitHub
1.  Go to [Vercel.com](https://vercel.com) and log in with your GitHub account.
2.  Click **"Add New"** > **"Project"**.
3.  Find your `Ratnesh-Portfolio` repository and click **"Import"**.

## 2. Configure Project Settings
- **Framework Preset**: Other (it will use the `vercel.json` configuration).
- **Root Directory**: `./` (leave it as default).

## 3. Critical: Environment Variables
Before you click deploy, scroll down to the **Environment Variables** section. You **MUST** add these exactly as they are in your local `.env` file:

| Variable Name | Value (Example) | Description |
| :--- | :--- | :--- |
| `EMAIL_USER` | `ratneshaugustus@gmail.com` | Your Gmail address |
| `EMAIL_PASS` | `ytjm cyhi xvnn qyne` | Your 16-character Google App Password |
| `MY_EMAIL` | `ratneshaugustus@gmail.com` | The email that receives the contact form messages |
| `FRONTEND_URL` | `*` | Use `*` to allow all URLs during the first deployment |

> [!IMPORTANT]
> Do NOT skip adding these variables, or your contact form will not work in production!

## 4. Deploy
1. Click **"Deploy"**.
2. Wait a minute for the build to finish.
3. Once finished, Vercel will give you a live URL like `https://ratnesh-portfolio.vercel.app`.

## 5. Troubleshooting (Optional)
If you see a "Not Found" error after deployment:
1. Ensure your `frontend/dist` folder is being built.
2. Check the **Logs** in your Vercel Dashboard for any backend errors related to your email credentials.

---
**Done!** Your portfolio is now live for the world to see!
