# Smriti Sardar — Portfolio Website

A responsive, static portfolio website with a dark premium visual style. It is built with HTML, CSS, and vanilla JavaScript, so no build step is required.

## Preview locally
Open `index.html` in your browser. For a more reliable local preview, use VS Code with the Live Server extension.

## Before publishing
1. Replace the portrait placeholder in `index.html` with your photo. Suggested approach:
   - Add your image to `assets/` (for example, `smriti-photo.jpg`).
   - Replace the `<div class="portrait-placeholder"...>...</div>` block with:
     ```html
     <div class="portrait-placeholder">
       <img src="assets/smriti-photo.jpg" alt="Smriti Sardar" class="profile-photo">
     </div>
     ```
   - Add this CSS rule to `styles.css`:
     ```css
     .profile-photo { width:100%; height:100%; object-fit:cover; object-position:center; }
     ```
2. Replace `YOUR_EMAIL@example.com` in `index.html` with the correct professional email address.
3. Replace the three clearly labelled concept project cards with real work samples. Do not present placeholder concepts as client work.
4. Update the service list so it reflects skills you actually offer.
5. Add any portfolio or social links you want to share.

## Deploy on Vercel (no terminal needed)
1. Extract the ZIP file on your computer.
2. Create or sign in to your account at https://vercel.com/.
3. Create a GitHub repository and upload the files from this project to it (keep `index.html`, `styles.css`, `script.js`, and `vercel.json` at the repository root).
4. In Vercel, choose **Add New → Project**, import that GitHub repository, and deploy.
5. Since this is a static site, no framework preset or build command is needed. If Vercel asks for an output directory, use `.` (the project root).
6. Open the generated `*.vercel.app` URL and test the mobile layout, email link, and images.

Alternative: use Vercel's CLI from a terminal in the extracted project folder:
```bash
npm install -g vercel
vercel
```
Follow the prompts, then run `vercel --prod` to publish to production.

## Notes
- This package does not include personal photo, email address, or real project samples yet.
- No Vercel account has been accessed and no deployment has been performed from this package.
