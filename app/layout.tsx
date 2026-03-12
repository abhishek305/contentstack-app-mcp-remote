export const metadata = {
  title: "Contentstack App MCP",
  description: "Remote MCP server for Contentstack app development",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
