export function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjMethod = {
      configurable: true,
      get() {
        return originalMethod.bind(this);
      },
    };
  
    return adjMethod;
  }