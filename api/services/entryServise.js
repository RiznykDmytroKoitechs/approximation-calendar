const uuid = require("uuid");
var Entry = require("../models/entry");

class EntryServise {
  createEntry({ date, hours, comment, ownerId }) {
    if (!date) date = new Date();
    return Entry.create({
      date: date,
      numberOfHours: hours,
      comment: comment ? comment : null,
      ownerId: ownerId,
      id: uuid.v4(),
    })
      .then((res) => {
        return {
          date: res.date,
          hours: res.numberOfHours,
          comment: res.comment,
          id: res.id,
        };
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  editEntry({ date, hours, comment, id }) {
    return Entry.update(
      {
        date,
        numberOfHours: hours,
        comment: comment ? comment : null,
      },
      {
        where: {
          id: id,
        },
      }
    )
      .then((res) => {
        console.log(res);
        return res[0].dataValues;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  getEntryById(id) {
    return Entry.findOne({ where: { id: id } })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  getEntriesByUserId(userId, paginationAmount, page = 0) {
    if (paginationAmount) {
      return Entry.findAll({
        where: { ownerId: userId },
        offset: page * paginationAmount,
        limit: paginationAmount,
        order: [["date", "DESC"]],
      }).then((res) => {
        let dataVals = [];
        res.forEach((val) => {
          dataVals.push({
            id: val.dataValues.id,
            date: val.dataValues.date,
            hours: val.dataValues.numberOfHours,
            comment: val.dataValues.comment,
          });
        });
        console.log(dataVals);
        return dataVals;
      });
    } else {
      return Entry.findAll({
        where: { ownerId: userId },
        order: [["date", "DESC"]],
      }).then((res) => {
        let dataVals = [];
        res.forEach((val) => {
          dataVals.push({
            id: val.dataValues.id,
            date: val.dataValues.date,
            hours: val.dataValues.numberOfHours,
            comment: val.dataValues.comment,
          });
        });
        console.log(dataVals);
        return dataVals;
      });
    }
  }
}

module.exports = new EntryServise();
