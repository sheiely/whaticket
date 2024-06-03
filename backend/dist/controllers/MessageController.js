"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.send = exports.remove = exports.store = exports.index = void 0;
const AppError_1 = __importDefault(require("../errors/AppError"));
const Mustache_1 = __importDefault(require("../helpers/Mustache"));
const SetTicketMessagesAsRead_1 = __importDefault(require("../helpers/SetTicketMessagesAsRead"));
const socket_1 = require("../libs/socket");
const Queue_1 = __importDefault(require("../models/Queue"));
const User_1 = __importDefault(require("../models/User"));
const Whatsapp_1 = __importDefault(require("../models/Whatsapp"));
const CreateOrUpdateContactService_1 = __importDefault(require("../services/ContactServices/CreateOrUpdateContactService"));
const ListMessagesService_1 = __importDefault(require("../services/MessageServices/ListMessagesService"));
const FindOrCreateTicketService_1 = __importDefault(require("../services/TicketServices/FindOrCreateTicketService"));
const ShowTicketService_1 = __importDefault(require("../services/TicketServices/ShowTicketService"));
const UpdateTicketService_1 = __importDefault(require("../services/TicketServices/UpdateTicketService"));
const CheckNumber_1 = __importDefault(require("../services/WbotServices/CheckNumber"));
const DeleteWhatsAppMessage_1 = __importDefault(require("../services/WbotServices/DeleteWhatsAppMessage"));
const GetProfilePicUrl_1 = __importDefault(require("../services/WbotServices/GetProfilePicUrl"));
const SendWhatsAppMedia_1 = __importDefault(require("../services/WbotServices/SendWhatsAppMedia"));
const SendWhatsAppMessage_1 = __importDefault(require("../services/WbotServices/SendWhatsAppMessage"));
const ListBlacklist_1 = __importDefault(require("../services/BlacklistsService/ListService"));
const CreateBulkMesssage_1 = __importDefault(require("../services/BulkMessagesServices/CreateService"));
const ListQueueOptionService_1 = __importDefault(require("../services/QueueOptionService/ListService"));
const UpdateSetting_1 = __importDefault(require("../services/SettingServices/UpdateSettingService"));
const CreateEvent_1 = __importDefault(require("../services/EventsServices/CreateService"));
const ListEvent_1 = __importDefault(require("../services/EventsServices/ListService"));
const CreateScore_1 = __importDefault(require("../services/ScoresServices/CreateService"));
const ShowTicket_1 = __importDefault(require("../services/TicketServices/ShowTicketService"));


const index = async (req, res) => {
    const { ticketId } = req.params;
    const { pageNumber } = req.query;
    const { companyId, profile } = req.user;
    const queues = [];
    if (profile !== "admin") {
        const user = await User_1.default.findByPk(req.user.id, {
            include: [{ model: Queue_1.default, as: "queues" }]
        });
        user.queues.forEach(queue => {
            queues.push(queue.id);
        });
    }
    const { count, messages, ticket, hasMore } = await (0, ListMessagesService_1.default)({
        pageNumber,
        ticketId,
        companyId,
        queues
    });
    (0, SetTicketMessagesAsRead_1.default)(ticket);
    return res.json({ count, messages, ticket, hasMore });
};
exports.index = index;
const store = async (req, res) => {
    const { ticketId } = req.params;
    const { body, quotedMsg } = req.body;
    const medias = req.files;
    const { companyId } = req.user;
    const ticket = await (0, ShowTicketService_1.default)(ticketId, companyId);
    (0, SetTicketMessagesAsRead_1.default)(ticket);
    console.log('bodyyyyyyyyyy:', body);
    if (medias) {
        await Promise.all(medias.map(async (media, index) => {
            await (0, SendWhatsAppMedia_1.default)({ media, ticket, body: Array.isArray(body) ? body[index] : body });
        }));
    }
    else {
        const send = await (0, SendWhatsAppMessage_1.default)({ body, ticket, quotedMsg });
    }
    return res.send();
};
exports.store = store;
const remove = async (req, res) => {
    const { messageId } = req.params;
    const { companyId } = req.user;
    const message = await (0, DeleteWhatsAppMessage_1.default)(messageId);
    const io = (0, socket_1.getIO)();
    io.to(message.ticketId.toString()).emit(`company-${companyId}-appMessage`, {
        action: "update",
        message
    });
    return res.send();
};
exports.remove = remove;
const send = async (req, res) => {
    const { whatsappId } = req.params;
    const messageData = req.body;
    const medias = req.files;
    console.log('messageData;', messageData);
    try {
        const whatsapp = await Whatsapp_1.default.findByPk(whatsappId);
        if (!whatsapp) {
            throw new Error("Não foi possível realizar a operação");
        }
        if (messageData.number === undefined) {
            throw new Error("O número é obrigatório");
        }
        const numberToTest = messageData.number;
        const body = messageData.body;
        const companyId = whatsapp.companyId;
        const CheckValidNumber = await (0, CheckNumber_1.default)(numberToTest, companyId);
        const number = CheckValidNumber.jid.replace(/\D/g, "");
        const profilePicUrl = await (0, GetProfilePicUrl_1.default)(number, companyId);
        const contactData = {
            name: `${number}`,
            number,
            profilePicUrl,
            isGroup: false,
            companyId
        };
        const contact = await (0, CreateOrUpdateContactService_1.default)(contactData);
        const ticket = await (0, FindOrCreateTicketService_1.default)(contact, whatsapp.id, 0, companyId);
        const idBlacked = await (0, ListBlacklist_1.default)({
            number: number,
        });
      
        if(idBlacked != ""){
            await (0, CreateBulkMesssage_1.default)(number, body, messageData.ev_id, "Numero na blacklist", messageData.type);
            throw new Error("Numero na blacklist");
        }



        if (medias) {
            console.log("media aki oh uai");
            console.log(medias);
            await Promise.all(medias.map(async (media) => {
                await req.app.get("queues").messageQueue.add("SendMessage", {
                    whatsappId,
                    data: {
                        number,
                        body: body ? (0, Mustache_1.default)(body, contact) : media.originalname,
                        mediaPath: media.path,
                        fileName: media.originalname
                    }
                }, { removeOnComplete: true, attempts: 3 });
            }));
        }
        else {
            await (0, SendWhatsAppMessage_1.default)({ body: (0, Mustache_1.default)(body, contact), ticket });
            await ticket.update({
                lastMessage: body,
            });
        }
        if (messageData.closeTicket) {
            setTimeout(async () => {
                await (0, UpdateTicketService_1.default)({
                    ticketId: ticket.id,
                    ticketData: { status: "closed" },
                    companyId
                });
            }, 1000);
        }
        (0, SetTicketMessagesAsRead_1.default)(ticket);
        
        if(messageData.ev_id){
            if(medias){
                await (0, CreateBulkMesssage_1.default)(number,"mensagem com midia", messageData.ev_id, "Mensagem enviada com sucesso", messageData.type);
            }else{
                await (0, CreateBulkMesssage_1.default)(number, body, messageData.ev_id, "Mensagem enviada com sucesso", messageData.type);
            }
            
        }
        
        return res.send({ mensagem: "Mensagem enviada" });
    }
    catch (err) {
        if (Object.keys(err).length === 0) {
            throw new AppError_1.default("Não foi possível enviar a mensagem, tente novamente em alguns instantes");
        }
        else {
            throw new AppError_1.default(err.message);
        }
    }
};
exports.send = send;

async function processBulk(req){
   
   

    const tamanho = req.body.array.length;
    const { whatsappId } = req.params;
    
    try{
      const whatsapp = await Whatsapp_1.default.findByPk(whatsappId);
      if (!whatsapp) {
        throw new Error("Não foi possível conectar com o whatsapp");
      }
      for(var i = 0; i < tamanho; i++){
        const messageData = req.body.array[i];
        const medias = req.files;
     
   
        if (messageData.number === undefined) {
            continue;
        }
        const numberToTest = messageData.number;
        const body = messageData.body;
        const companyId = whatsapp.companyId;
        let CheckValidNumber;
        try{
          CheckValidNumber = await (0, CheckNumber_1.default)(numberToTest, companyId);
          
        }catch(err){
          await (0, CreateBulkMesssage_1.default)(number, body, messageData.ev_id, "Numero invalido", messageData.type);
          continue;
        }
        
        const number = CheckValidNumber.jid.replace(/\D/g, "");

        
        const idBlacked = await (0, ListBlacklist_1.default)({
            number: number,
        });
      
        if(idBlacked != ""){
            await (0, CreateBulkMesssage_1.default)(number, body, messageData.ev_id, "Numero na blacklist", messageData.type);
            continue;
        }

        

        const profilePicUrl = await (0, GetProfilePicUrl_1.default)(number, companyId);
          
        const contactData = {
            name: `${number}`,
            number,
            profilePicUrl,
            isGroup: false,
            companyId
        };
        const contact = await (0, CreateOrUpdateContactService_1.default)(contactData);
        
        const ticket = await (0, FindOrCreateTicketService_1.default)(contact, whatsapp.id, 0, companyId);
        
        if (medias) {
            await Promise.all(medias.map(async (media) => {
                await req.app.get("queues").messageQueue.add("SendMessage", {
                    whatsappId,
                    data: {
                        number,
                        body: body ? (0, Mustache_1.default)(body, contact) : media.originalname,
                        mediaPath: media.path,
                        fileName: media.originalname
                    }
                }, { removeOnComplete: true, attempts: 3 });
            }));
        }
        else {
            
            await (0, SendWhatsAppMessage_1.default)({ body: (0, Mustache_1.default)(body, contact), ticket });
            await ticket.update({
                lastMessage: body,
            });
            
        }
        
        if (messageData.closeTicket) {
            setTimeout(async () => {
                await (0, UpdateTicketService_1.default)({
                    ticketId: ticket.id,
                    ticketData: { status: "closed" },
                    companyId
                });
            }, 1000);
        }
        (0, SetTicketMessagesAsRead_1.default)(ticket);
        await (0, CreateBulkMesssage_1.default)(number, body, messageData.ev_id, "Mensagem enviada com sucesso", messageData.type);
      
      }
    }
    catch (err) {
        throw new AppError_1.default(err.message);
    }
   return;
}

const bulk = async (req, res) => {
    processBulk(req);
    return res.send({body:"Acao será processada, olhe o resultado no servidor apos alguns minutos"});
};
exports.bulk = bulk;


const treatQueue = async (req, res) => {
    const queueId = req.body.queueId;
    const companyId = req.body.companyId;
    try{
        if(queueId === undefined){
            throw new Error("queueId obrigatório");
        }
        if(companyId === undefined){
            throw new Error("companyId é obrigatório");
        }
        await UpdateSetting_1.default({
                key: "searchResultsQueue", 
                value: queueId, 
                companyId: companyId
        });
        return res.send({body: "Fila de blacklist adicionada com sucesso"});
       
        
    }catch(err){
        throw new AppError_1.default(err.message);
    }
    


    
   
};
exports.treatQueue = treatQueue;

const createEvent = async (req, res) => {
    try{
        const event = await CreateEvent_1.default({id: req.body.id, name: req.body.name, date: req.body.date});
        return res.send("Evento adicionado com sucesso");
    }catch(err){
        throw new AppError_1.default(err.message);
    }

};
exports.createEvent = createEvent;

const createScore = async (req, res) => {
    try{
        const event = await CreateScore_1.default({id:req.body.id , name:req.body.name, number: req.body.number, time: req.body.time, event: req.body.event});
        return res.send("Score adicionado com sucesso");
    }catch(err){
        throw new AppError_1.default(err.message);
    }

};
exports.createScore = createScore;



const searchDate = async (req, res) => {
    const ticket = await ShowTicketService_1.default(1, 1);
    await ticket.update({
        stage: {
            phase: "1",
            events_listed: [],
            event_selected: "4",
            number: "2",
            cpf: "918"
        }
    });            
    return res.send(ticket);

};
exports.searchDate = searchDate;