const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const db = require("../models/index");

const getMemberInfoByUsername = async (username) => {
  if (typeof username !== "string") {
    throw new TypeError("Username must be a string");
  }
  if (username.trim() === "") {
    throw new RangeError("Username must not be empty or space-filled");
  }
  return (await db["Members"].findOne({ where: { name: username } }))
    .dataValues;
};

const getMemberInfoById = async (id) => {
  if (typeof id !== "number") {
    throw new TypeError("ID must be a string");
  }
  return (await db["Members"].findOne({ where: { id: id } })).dataValues;
};

const getMemberInfoByMail = async (mail) => {
  const result = await db["Members"].findOne({
    where: {
      mail: mail,
    },
  });
  return result;
};

const getMemberInfoByUsernameOrMail = async (usernameOrMail) => {
  if (typeof usernameOrMail !== "string") {
    throw new TypeError("UsernameOrMail must be a string");
  }
  const result = await db["Members"].findOne({
    where: {
      [Op.or]: [{ name: usernameOrMail }, { mail: usernameOrMail }],
    },
  });
  return result;
};

const getMemberInfoByCardId = async (cardId) => {
  const result = await db["Members"].findOne({
    where: {
      cardId: cardId,
    },
  });
  return result?.dataValues;
};

const getMemberInfoByLineId = async (lineId) => {
  if (typeof lineId !== "string") {
    throw new TypeError("LineID must be a string");
  }
  if (lineId.trim() === "") {
    throw new RangeError("LineID must not be empty or space-filled");
  }
  return (await db["Members"].findOne({ where: { lineId: lineId } }))
    .dataValues;
};

const checkMemberExistsByUsername = async (username) => {
  if (typeof username !== "string") {
    throw new TypeError("Username must be a string");
  }
  if (username.trim() === "") {
    throw new RangeError("Username must not be empty or space-filled");
  }
  return (
    (await db["Members"].findOne({ where: { name: username } })) !== null
  );
};

const checkMemberExistsByMail = async (mail) => {
  return (
    (await db["Members"].findOne({ where: { mail: mail } })) !== null
  );
};

const checkMemberExistsByUsernameOrMail = async (usernameOrMail) => {
  if (typeof usernameOrMail !== "string") {
    throw new TypeError("Username must be a string");
  }
  const result = await db["Members"].findOne({
    where: {
      [Op.or]: [{ name: usernameOrMail }, { mail: usernameOrMail }],
    },
  });
  return result;
};

const checkMemberExistsById = async (id) => {
  if (typeof id !== "number") {
    throw new TypeError("Id must be a number");
  }
  const member = await db["Members"].findOne({
    where: { id: id },
  });
  return member !== null;
};
const checkMemberExistsByCardId = async (cardId) => {
  if (typeof cardId !== "string") {
    throw new TypeError("Card ID must be a string");
  }

  const member = await db["Members"].findOne({
    where: { cardId: cardId },
  });
  return member !== null;
};

const getMemberHash = async (username) => {
  if (typeof username !== "string") {
    throw new TypeError("Username must be a string");
  }
  if (username.trim() === "") {
    throw new RangeError("Username must not be empty or space-filled");
  }
  const member = await db["Members"].findOne({
    where: { name: username },
  });
  if (!member?.dataValues) return "";
  return member.dataValues.password || "";
};

const addMember = async (username, mail, phoneNumber, cardId, level) => {
  const [member, created] = await db["Members"].findOrCreate({
    where: { name: username },
    defaults: {
      mail: mail,
      phoneNumber: phoneNumber,
      cardId: cardId,
      level: level,
    },
  });
  return [member, created];
};

module.exports = {
  getMemberInfoByUsername,
  getMemberInfoById,
  getMemberInfoByLineId,
  getMemberInfoByCardId,
  getMemberInfoByMail,
  checkMemberExistsByUsername,
  checkMemberExistsById,
  checkMemberExistsByMail,
  checkMemberExistsByCardId,
  getMemberHash,
  addMember,
  checkMemberExistsByUsernameOrMail,
  getMemberInfoByUsernameOrMail,
};
