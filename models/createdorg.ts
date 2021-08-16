import { Model, Optional, DataTypes } from 'sequelize';
import { sequelize } from '.';

interface CreatedOrgAttributes {
  id: string;
  repoUrl: string;
  email: string;
}

/*
  We have to declare the CreatedOrgCreationAttributes to
  tell Sequelize and TypeScript that the property id,
  in this case, is optional to be passed at creation time
*/
interface CreatedOrgCreationAttributes
  extends Optional<CreatedOrgAttributes, 'id'> {}

interface CreatedOrgInstance
  extends Model<CreatedOrgAttributes, CreatedOrgCreationAttributes>,
    CreatedOrgAttributes {
      createdAt?: Date;
      updatedAt?: Date;
    }

const CreatedOrg = sequelize.define<CreatedOrgInstance>(
  'CreatedOrg',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true
    },
    repoUrl: {
      allowNull: true,
      type: DataTypes.TEXT
    },
    email: {
      allowNull: false,
      type: DataTypes.TEXT
    }
  }
);