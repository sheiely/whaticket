"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const User_1 = __importDefault(require("../models/User"));
const Setting_1 = __importDefault(require("../models/Setting"));
const Contact_1 = __importDefault(require("../models/Contact"));
const Ticket_1 = __importDefault(require("../models/Ticket"));
const Whatsapp_1 = __importDefault(require("../models/Whatsapp"));
const ContactCustomField_1 = __importDefault(require("../models/ContactCustomField"));
const Message_1 = __importDefault(require("../models/Message"));
const Queue_1 = __importDefault(require("../models/Queue"));
const WhatsappQueue_1 = __importDefault(require("../models/WhatsappQueue"));
const UserQueue_1 = __importDefault(require("../models/UserQueue"));
const Company_1 = __importDefault(require("../models/Company"));
const Plan_1 = __importDefault(require("../models/Plan"));
const TicketNote_1 = __importDefault(require("../models/TicketNote"));
const QuickMessage_1 = __importDefault(require("../models/QuickMessage"));
const Help_1 = __importDefault(require("../models/Help"));
const TicketTraking_1 = __importDefault(require("../models/TicketTraking"));
const UserRating_1 = __importDefault(require("../models/UserRating"));
const QueueOption_1 = __importDefault(require("../models/QueueOption"));
const Schedule_1 = __importDefault(require("../models/Schedule"));
const Tag_1 = __importDefault(require("../models/Tag"));
const Blacklists_1 = __importDefault(require("../models/Blacklists"));
const Events_1 = __importDefault(require("../models/Events"));
const Scores_1 = __importDefault(require("../models/Scores"));
const BulkMessages_1 = __importDefault(require("../models/BulkMessages"));
const TicketTag_1 = __importDefault(require("../models/TicketTag"));
const ContactList_1 = __importDefault(require("../models/ContactList"));
const ContactListItem_1 = __importDefault(require("../models/ContactListItem"));
const Campaign_1 = __importDefault(require("../models/Campaign"));
const CampaignSetting_1 = __importDefault(require("../models/CampaignSetting"));
const Baileys_1 = __importDefault(require("../models/Baileys"));
const CampaignShipping_1 = __importDefault(require("../models/CampaignShipping"));
const Announcement_1 = __importDefault(require("../models/Announcement"));
const Chat_1 = __importDefault(require("../models/Chat"));
const ChatUser_1 = __importDefault(require("../models/ChatUser"));
const ChatMessage_1 = __importDefault(require("../models/ChatMessage"));
const Invoices_1 = __importDefault(require("../models/Invoices"));
const Subscriptions_1 = __importDefault(require("../models/Subscriptions"));
const BaileysChats_1 = __importDefault(require("../models/BaileysChats"));
const Files_1 = __importDefault(require("../models/Files"));
const FilesOptions_1 = __importDefault(require("../models/FilesOptions"));
const Prompt_1 = __importDefault(require("../models/Prompt"));
const QueueIntegrations_1 = __importDefault(require("../models/QueueIntegrations"));
// eslint-disable-next-line
const dbConfig = require("../config/database");
// import dbConfig from "../config/database";
const sequelize = new sequelize_typescript_1.Sequelize(dbConfig);
const models = [
    Company_1.default,
    User_1.default,
    Contact_1.default,
    Ticket_1.default,
    Message_1.default,
    Whatsapp_1.default,
    ContactCustomField_1.default,
    Setting_1.default,
    Queue_1.default,
    WhatsappQueue_1.default,
    UserQueue_1.default,
    Plan_1.default,
    TicketNote_1.default,
    QuickMessage_1.default,
    Help_1.default,
    TicketTraking_1.default,
    UserRating_1.default,
    QueueOption_1.default,
    Schedule_1.default,
    Tag_1.default,
    TicketTag_1.default,
    ContactList_1.default,
    ContactListItem_1.default,
    Campaign_1.default,
    CampaignSetting_1.default,
    Baileys_1.default,
    CampaignShipping_1.default,
    Announcement_1.default,
    Chat_1.default,
    ChatUser_1.default,
    ChatMessage_1.default,
    Invoices_1.default,
    Subscriptions_1.default,
    BaileysChats_1.default,
    Files_1.default,
    FilesOptions_1.default,
    Prompt_1.default,
    QueueIntegrations_1.default,
    Blacklists_1.default,
    BulkMessages_1.default,
    Events_1.default,
    Scores_1.default
];
sequelize.addModels(models);
exports.default = sequelize;
