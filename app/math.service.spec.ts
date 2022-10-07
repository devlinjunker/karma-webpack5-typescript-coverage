import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/mocha-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
import { mathService } from "math.service"
import { expect } from 'chai';

describe('math.service', () => {
  it('should add', () => {
    expect(mathService.add(1, 2)).to.equal(3);
  })
})