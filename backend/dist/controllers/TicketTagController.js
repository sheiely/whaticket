"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.store = void 0;
const TicketTag_1 = __importDefault(require("../models/TicketTag"));
const Tag_1 = __importDefault(require("../models/Tag"));
const store = async (req, res) => {
    const { ticketId, tagId } = req.params;
    try {
        const ticketTag = await TicketTag_1.default.create({ ticketId, tagId });
        return res.status(201).json(ticketTag);
    }
    catch (error) {
        return res.status(500).json({ error: 'Failed to store ticket tag.' });
    }
};
exports.store = store;
/*
export const remove = async (req: Request, res: Response): Promise<Response> => {
  const { ticketId } = req.params;



  try {
    await TicketTag.destroy({ where: { ticketId } });
    return res.status(200).json({ message: 'Ticket tags removed successfully.' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to remove ticket tags.' });
  }
};
*/
const remove = async (req, res) => {
    const { ticketId } = req.params;
    try {
        // Retrieve tagIds associated with the provided ticketId from TicketTags
        const ticketTags = await TicketTag_1.default.findAll({ where: { ticketId } });
        const tagIds = ticketTags.map((ticketTag) => ticketTag.tagId);
        // Find the tagIds with kanban = 1 in the Tags table
        const tagsWithKanbanOne = await Tag_1.default.findAll({
            where: {
                id: tagIds,
                kanban: 1,
            },
        });
        // Remove the tagIds with kanban = 1 from TicketTags
        const tagIdsWithKanbanOne = tagsWithKanbanOne.map((tag) => tag.id);
        if (tagIdsWithKanbanOne)
            await TicketTag_1.default.destroy({ where: { ticketId, tagId: tagIdsWithKanbanOne } });
        return res.status(200).json({ message: 'Ticket tags removed successfully.' });
    }
    catch (error) {
        return res.status(500).json({ error: 'Failed to remove ticket tags.' });
    }
};
exports.remove = remove;
