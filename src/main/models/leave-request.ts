import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { sequelize } from '../services/database/database.service';

// eslint-disable-next-line strict, lines-around-directive

export interface LeaveRequestAttributes
  extends Model<
    InferAttributes<LeaveRequestAttributes>,
    InferCreationAttributes<LeaveRequestAttributes>
  > {
  id: CreationOptional<string>;
  employee_id: string;
  leavetype_id: string;
  start_date: Date;
  end_date: Date;
  reason?: string;
  status: 'pending' | 'approved' | 'rejected';
}

const LeaveBalance = sequelize.define<LeaveRequestAttributes>(
  'LeaveRequest',
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    employee_id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      references: {
        model: 'Employees',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    leavetype_id: {
      type: DataTypes.UUIDV4,
      references: {
        model: 'LeaveCategories',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    status: {
      type: DataTypes.TEXT,
      defaultValue: 'pending',
    },
  },
  {
    tableName: 'LeaveRequests',
  },
);

export default LeaveBalance;
