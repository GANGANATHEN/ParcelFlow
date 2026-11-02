import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password, rememberMe } = body;

    // Server-side validation against environment variables
    const validUsername = process.env.DEMO_AUTH_USERNAME || "admin@parcelflow.com";
    const validPassword = process.env.DEMO_AUTH_PASSWORD || "courierdemo2025";

    // Strict validation
    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "Username and password are required." },
        { status: 400 }
      );
    }

    const trimmedUser = username.trim().toLowerCase();
    const expectedUser = validUsername.trim().toLowerCase();

    // Allow username match with email or 'admin' shortcut for demo convenience
    const isUserValid = trimmedUser === expectedUser || trimmedUser === "admin";
    const isPassValid = password === validPassword;

    if (!isUserValid || !isPassValid) {
      // Artificial delay for realistic security feedback
      await new Promise((res) => setTimeout(res, 600));
      return NextResponse.json(
        {
          success: false,
          message: "Invalid credentials. Please verify your username and password.",
        },
        { status: 401 }
      );
    }

    // Set demo session cookie
    const sessionData = {
      username: validUsername,
      name: "Rajesh Sharma",
      role: "Senior Operations Supervisor",
      branch: process.env.DEMO_BRANCH_NAME || "Koramangala Hub (BLR-04)",
      loginTime: new Date().toISOString(),
      isDemoSession: true,
    };

    const cookieStore = cookies();
    const maxAge = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24; // 30 days or 1 day

    cookieStore.set("parcelflow_session", JSON.stringify(sessionData), {
      path: "/",
      httpOnly: false, // Accessible to client context as well
      sameSite: "lax",
      maxAge,
    });

    return NextResponse.json({
      success: true,
      message: "Authentication successful",
      user: sessionData,
    });
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error during authentication" },
      { status: 500 }
    );
  }
}

