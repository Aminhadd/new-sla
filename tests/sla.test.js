const test = require('node:test');
const assert = require('node:assert/strict');
const { computeSlaDeadlines, computeBreachState } = require('../dist-test/sla');

test('compute SLA deadlines', () => {
  const createdAt = new Date('2026-01-01T00:00:00Z');
  const result = computeSlaDeadlines(createdAt, { priority: 'Emergency', response_minutes: 30, resolve_minutes: 120, escalation_minutes: 10 });
  assert.equal(result.responseBy.toISOString(), '2026-01-01T00:30:00.000Z');
  assert.equal(result.resolveBy.toISOString(), '2026-01-01T02:00:00.000Z');
});

test('breach state flags', () => {
  const state = computeBreachState({
    now: new Date('2026-01-01T01:00:00Z'),
    responseBy: new Date('2026-01-01T00:30:00Z'),
    resolveBy: new Date('2026-01-01T03:00:00Z'),
    status: 'In Progress'
  });
  assert.equal(state.responseBreached, true);
  assert.equal(state.resolutionBreached, false);
});
