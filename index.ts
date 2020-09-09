import mongoose, { ConnectionOptions } from "mongoose";

import { getModelForClass, prop, setGlobalOptions } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";

setGlobalOptions({
  globalOptions: {
    useNewEnum: true,
  },
});

const mongooseUrl = `mongodb://localhost:27017/swc_test`;

const mongooseConnectionOptions: ConnectionOptions = {
  dbName: "swc_test",
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  poolSize: 10,
};

mongoose.connect(mongooseUrl, mongooseConnectionOptions).catch(console.error);

enum TestEnum {
  a = "a",
  b = "b",
}

export class InternalObj {
  @prop()
  a: number;
}

export class TestEntity {
  readonly _id: ObjectId;

  @prop()
  a: string;

  @prop({
    enum: TestEnum,
    // type: String,
  })
  b: TestEnum;

  @prop()
  c: InternalObj;
}

const TestModel = getModelForClass(TestEntity);

TestModel.create({
  a: "asd",
  b: TestEnum.a,
  c: {
    a: 123,
  },
})
  .then((created) => {
    console.log(created);
  })
  .finally(() => {
    process.exit(0);
  });
