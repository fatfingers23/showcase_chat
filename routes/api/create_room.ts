import { HandlerContext, Handlers } from "../../server_deps.ts";
import { database } from "../../communication/database.ts";
import { badWordsCleanerLoader } from "../../helpers/bad_words.ts";

export const handler: Handlers = {
  POST: async (req: Request, _ctx: HandlerContext): Promise<Response> => {
    const badWordsCleaner = await badWordsCleanerLoader.getInstance();
    const name = badWordsCleaner.clean(await req.text());
    const roomId = await database.ensureRoom(name);

    return new Response(roomId, {
      status: 201,
    });
  },
};
