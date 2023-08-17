import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IReturnUser } from 'types';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers(): Promise<IReturnUser[]> {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        phoneNumber: true,
      },
    });
  }

  async getUserById(id: number): Promise<IReturnUser | null> {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        phoneNumber: true,
      },
    });
  }

  async createUser(data: CreateUserDto): Promise<User> {
    const password = bcrypt.hashSync(data.password, 10);
    return this.prisma.user.create({
      data: {
        ...data,
        password,
      },
    });
  }

  async updateUser(id: number, data: UpdateUserDto): Promise<User> {
    if (data.password) {
      data.password = bcrypt.hashSync(data.password, 10);
    }
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
