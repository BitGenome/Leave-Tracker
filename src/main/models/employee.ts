/* eslint-disable import/no-cycle */
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { sequelize } from '../services/database/database.service';
import LeaveBalance from './leave-balance';

export interface EmployeeAttributes
  extends Model<
    InferAttributes<EmployeeAttributes>,
    InferCreationAttributes<EmployeeAttributes>
  > {
  id: CreationOptional<string>;
  firstname: string;
  lastname: string;
  employee_id: string;
  position: string;
}
const Employee = sequelize.define<EmployeeAttributes>('Employees', {
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
  },
  position: {
    type: DataTypes.STRING,
  },
  employee_id: {
    type: DataTypes.STRING(255),
    unique: true,
    allowNull: false,
  },
});

Employee.hasMany(LeaveBalance, { foreignKey: 'employee_id' });
LeaveBalance.belongsTo(Employee, { foreignKey: 'employee_id' });
export default Employee;
