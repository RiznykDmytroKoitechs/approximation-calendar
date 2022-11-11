var {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize({
    dialect:"sqlite",
    storage:"./main.db"
});

const Entry = sequelize.define('entry', {
    date:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW,
        validate:{
            notNull:true
        },
        allowNull:false
    },
    numberOfHours:{
        type:DataTypes.NUMBER,
        validate:{
            max:10,
            notNull:true
        },
        allowNull:false
    },
    comment:{
        type:DataTypes.TEXT,
        validate:{
            len:[0, 10000]
        }
    },
    id:{
        type:DataTypes.UUIDV4,
        allowNull:false,
        primaryKey:true
    },
    ownerId:{
        type:DataTypes.UUIDV4,
        allowNull:false
    }
}, {
    timestamps:false
})

module.exports = Entry