const db = require("../../models");
const Message = db.Message;

const twilio = require("twilio");
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

exports.createMessage = async (req, res) => {
  try {
    const message = await Message.create({
      to: req.body.to,
      body: req.body.body,
    });
    console.log(req.body);
    // Initiate Voice Call
    const twilioVoiceResponse = await client.calls.create({
      twiml: `<Response><Say>${message.body}</Say></Response>`,
      to: message.to,
      from: process.env.TWILIO_PHONE_NUMBER,
    });

    res.status(200).send({
      status: "Success",

      message: {
        id: message.id,
        to: message.to,
        body: message.body,
        voiceSid: twilioVoiceResponse.sid,
        dateSent: twilioVoiceResponse.dateCreated,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong",
      error: error.message, // Include the actual error message
    });
  }
};
