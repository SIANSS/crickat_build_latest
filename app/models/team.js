var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var teamSchema = mongoose.Schema({
  team_name   : {type:String,required:false},
  location    : {type:String,required:false},
  date        : {type:Date, required:false},
  manager     : {
    name        : {type:String,required:false},
    number      : {type:String,required:false},
    mail        : {type:String,required:false},
    password    : {type:String,required:false}
  },
  captain     : {
    name        : {type:String,required:false},
    number      : {type:String,required:false},
    mail        : {type:String,required:false}
  },
  players     : {
    total       : {type:Number,required:false},
    player_01   : {
      name        : {type:String,required:false},
      number      : {type:String,required:false}
    },
    player_02   : {
      name        : {type:String,required:false},
      number      : {type:String,required:false}
    },
    player_03   : {
      name        : {type:String,required:false},
      number      : {type:String,required:false}
    },
    player_04   : {
      name        : {type:String,required:false},
      number      : {type:String,required:false}
    },
    player_05   : {
      name        : {type:String,required:false},
      number      : {type:String,required:false}
    },
    player_06   : {
      name        : {type:String,required:false},
      number      : {type:String,required:false}
    },
    player_07   : {
      name        : {type:String,required:false},
      number      : {type:String,required:false}
    },
    player_08   : {
      name        : {type:String,required:false},
      number      : {type:String,required:false}
    },
    player_09   : {
      name        : {type:String,required:false},
      number      : {type:String,required:false}
    },
    player_10   : {
      name        : {type:String,required:false},
      number      : {type:String,required:false}
    }
  },
  stats         : {
    strikeRate    : {type:String, required:false},
    wins          : {type:String, require:false}
  }
});

teamSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

teamSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.manager.password);
};

module.exports = mongoose.model('Team', teamSchema);
