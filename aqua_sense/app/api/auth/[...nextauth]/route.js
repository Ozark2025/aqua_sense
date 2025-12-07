

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import pool from "../../../../lib/db.js"; // adjust path if needed

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  // using JWT sessions because no Account/Session tables needed
  session: { strategy: "jwt" },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {

    async jwt({ token, account, profile }) {
      // no email? return token
      if (!token.email) return token;

      // check if user exists in DB
      const existing = await pool.query(
        `SELECT * FROM "User" WHERE email = $1 LIMIT 1`,
        [token.email]
      );

      // ---------------------------------------------
      // Create new user if not exists
      // ---------------------------------------------
      if (existing.rows.length === 0) {
        const insert = await pool.query(
          `INSERT INTO "User" (name, email, image, bio, role)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING id, name, email, image, bio, role`,
          [
            token.name || profile?.name || "Unnamed",
            token.email,
            token.picture || null,
            null,                 // bio default null
            "staff",              // default role
          ]
        );

        const user = insert.rows[0];

        // attach to token
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.bio = user.bio;
        token.role = user.role;
      }

      // ---------------------------------------------
      // User exists → load into token
      // ---------------------------------------------
      else {
        const user = existing.rows[0];

        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.bio = user.bio;
        token.role = user.role;
      }

      return token;
    },

    // ---------------------------------------------
    // 2️⃣ Session callback → expose data to frontend
    // ---------------------------------------------
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.image = token.image;
      session.user.bio = token.bio;
      session.user.role = token.role;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

