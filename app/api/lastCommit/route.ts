// pages/api/lastCommit.ts
import { NextResponse } from "next/server";
import { execSync } from "child_process";
import { format } from "path";

export const GET = () => {
  const commitInfo = execSync('git log -1 --pretty=format:"%h|%cd|%s"', {
    encoding: "utf8",
  });
  const commitInfoParts = commitInfo.split("|");

  if (commitInfoParts.length >= 3) {
    const commitHash = commitInfoParts[0];
    const commitDate = new Date(commitInfoParts[1]);
    const commitMessage = commitInfoParts[2];
    return NextResponse.json({
      lastCommitDate:
        commitDate?.toLocaleDateString() +
        " " +
        commitDate?.toLocaleTimeString(),
      lastCommitMessage: `${commitHash} , ${commitMessage}`,
    });
  } else {
    return NextResponse.json({
      lastCommitDate: new Date().toISOString(),
      lastCommitMessage: "Commit message not found",
    });
  }
};
