/* eslint-disable import/no-cycle */
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { sequelize } from '../services/database/database.service';
import Employee from './employee';
import LeaveCategory from './leave-category';

// eslint-disable-next-line strict, lines-around-directive

export interface LeaveBalanceAttributes
  extends Model<
    InferAttributes<LeaveBalanceAttributes>,
    InferCreationAttributes<LeaveBalanceAttributes>
  > {
  id: CreationOptional<string>;
  employee_id: string;
  leavetype_id: number;
  balance: number;
}

const LeaveBalance = sequelize.define<LeaveBalanceAttributes>('LeaveBalance', {
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  employee_id: {
    type: DataTypes.UUIDV4,
    allowNull: false,
    references: {
      model: Employee,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  leavetype_id: {
    type: DataTypes.UUIDV4,
    references: {
      model: LeaveCategory,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  balance: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

LeaveBalance.belongsTo(LeaveCategory, { foreignKey: 'leavetype_id' });

export default LeaveBalance;
