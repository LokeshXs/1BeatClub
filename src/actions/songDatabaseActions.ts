"use server";

import prisma from "@/lib/prisma";

export async function addSongToDB(songData: {
  user_id: string;
  songTitle: string;
  thumbnail: string;
  highResThumbnail: string;
  link: string;
  videoId: string;
  clubId: string;
}) {
  const addedSong = await prisma.listedSongs.create({
    data: {
      user_id: songData.user_id,
      songTitle: songData.songTitle,
      thumbnail: songData.thumbnail,
      highResThumbnail: songData.highResThumbnail,
      link: songData.link,
      videoId: songData.videoId,
      clubId: songData.clubId,
    },
  });

  return addedSong;
}


export const removeSong = async ({ songId }: { songId: number }) => {
  try {
    await prisma.listedSongs.delete({
      where: {
        id: songId,
      },
    });
  } catch (error: any) {
    console.log(error);
    return {
      status: "error",
      message: error.message || "Something went wrong, Try Again!",
    };
  }
};



export const voteSong = async ({
  songId,
  userId,
  actionType,
}: {
  songId: number;
  userId: string;
  actionType: "UPVOTE" | "DOWNVOTE";
}) => {
  try {
    if (actionType === "UPVOTE") {
      await prisma.votes.create({
        data: {
          songId: songId,
          user_id: userId,
        },
      });
    } else {
      await prisma.votes.delete({
        where: {
          songId_user_id: {
            songId: songId,
            user_id: userId,
          },
        },
      });
    }

    return {
      status: "success",
      message: "Song voted successfully!",
    };
  } catch (error: any) {
    console.log(error);
    return {
      status: "error",
      message: error.message || "Something went wrong, Try Again!",
    };
  }
};
