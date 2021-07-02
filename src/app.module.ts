import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AllocationModule } from './modules/allocations/allocations.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    AuthModule,
    AllocationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
