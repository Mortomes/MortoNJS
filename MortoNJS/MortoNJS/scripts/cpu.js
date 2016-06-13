var createCpu = function () {
    //private
    //registers
    var a, x, y;
    //program counter/stack pointer
    var pc, sp;
    //status bits
    var negative, overflow, inBreak, disableInterupt, zero, carry;
    var cartridge;
    var memory = cpumemory();

    var modes = {
        ZEROPAGE: 0, ZEROPAGE_X: 1, ZEROPAGE_Y: 2, ABSOLUTE: 3, ABSOLUTE_X: 4, ABSOLUTE_Y: 5,
        INDIRECT: 6, IMPLIED: 7, ACCUMULATOR: 8, IMMEDIATE: 9, RELATIVE: 10,
        INDIRECT_PRE: 11, INDIRECT_POST: 12
    };

    var adc = function () {

    };

    var and = function () {

    };

    var asl = function () {

    };

    var bcc = function () {

    };

    var bcs = function () {

    };

    var beq = function () {

    };

    var bit = function () {

    };

    var bmi = function () {

    };

    var bne = function () {

    };

    var bpl = function () {

    };

    var brk = function () {

    };

    var bvc = function () {

    };

    var bvs = function () {

    };

    var clc = function () {

    };

    var cld = function () {

    };

    var cli = function () {

    };

    var clv = function () {

    };

    var cmp = function () {

    };

    var cpx = function () {

    };

    var cpy = function () {

    };

    var dec = function () {

    };

    var dex = function () {

    };

    var dey = function () {

    };

    var eor = function () {

    };

    var inc = function () {

    };

    var inx = function () {

    };

    var iny = function () {

    };

    var jmp = function () {

    };

    var jsr = function () {

    };

    var lda = function () {

    };

    var ldx = function () {

    };

    var ldy = function () {

    };

    var lsr = function () {

    };

    var nop = function () {

    };

    var ora = function () {

    };

    var pha = function () {

    };

    var php = function () {

    };

    var pla = function () {

    };

    var plp = function () {

    };

    var rol = function () {

    };

    var ror = function () {

    };

    var rti = function () {

    };

    var rts = function () {

    };

    var sbc = function () {

    };

    var sec = function () {

    };

    var sed = function () {

    };

    var sei = function () {

    };

    var sta = function () {

    };

    var stx = function () {

    };

    var sty = function () {

    };

    var tax = function () {

    };

    var tay = function () {

    };

    var tsx = function () {

    };

    var txa = function () {

    };

    var txs = function () {

    };

    var tya = function () {

    };

    var instruction = function (name, f, mode) {
        return { name:name, f:f, mode: mode};
    };

    var lengths = [2, 2, 2, 3, 3, 3, 3, 1, 1, 2, 2, 2, 2];

    //TEST CODE
    pc = 0x8000;
    memory.set(0x8000, 0x38);
    //END TEST CODE

    var instrs = {
        0x00: instruction("BRK", brk, modes.IMMEDIATE),
        0x01: instruction("ORA", ora, modes.INDIRECT_PRE ),
        0x05: instruction("ORA", ora, modes.ZERO_PAGE ),
        0x06: instruction("ASL", asl, modes.ZERO_PAGE ),
        0x08: instruction("PHP", php, modes.IMPLIED ),
        0x09: instruction("ORA", ora, modes.IMMEDIATE ),
        0x0a: instruction("ASL", asl, modes.ACCUMULATOR ),
        0x0d: instruction("ORA", ora, modes.ABSOLUTE_X ),
        0x0e: instruction("ASL", asl, modes.ABSOLUTE ),
        0x10: instruction("BPL", bpl, modes.IMMEDIATE ),
        0x11: instruction("ORA", ora, modes.INDIRECT_POST ),
        0x15: instruction("ORA", ora, modes.ZEROPAGE_X ),
        0x16: instruction("ASL", asl, modes.ZEROPAGE_X ),
        0x18: instruction("CLC", clc, modes.IMPLIED ),
        0x19: instruction("ORA", ora, modes.ABSOLUTE_Y ),
        0x1d: instruction("ORA", ora, modes.ABSOLUTE_X ),
        0x1e: instruction("ASL", asl, modes.ABSOLUTE_X ),
        0x20: instruction("JSR", jsr, modes.ABSOLUTE ),
        0x21: instruction("AND", and, modes.INDIRECT_PRE ),
        0x24: instruction("BIT", bit, modes.ZERO_PAGE ),
        0x25: instruction("AND", and, modes.ZERO_PAGE ),
        0x26: instruction("ROL", rol, modes.ZERO_PAGE ),
        0x28: instruction("PLP", plp, modes.IMPLIED ),
        0x29: instruction("AND", and, modes.IMMEDIATE ),
        0x2a: instruction('ROL', rol, modes.ACCUMULATOR ),
        0x2c: instruction("BIT", bit, modes.ABSOLUTE ),
        0x2d: instruction("AND", and, modes.ABSOLUTE),
        0x2e: instruction("ROL", rol, modes.ABSOLUTE),
        0x30: instruction("BMI", bmi, modes.IMPLIED),
        0x31: instruction("AND", and, modes.INDIRECT_POST),
        0x35: instruction("AND", and, modes.ZEROPAGE_X),
        0x36: instruction("ROL", rol, modes.ZEROPAGE_X),
        0x38: instruction("SEC", sec, modes.IMPLIED),
        0x39: instruction("AND", and, modes.INDIRECT_POST),
        0x3d: instruction("AND", and, modes.ABSOLUTE_X),
        0x3e: instruction("ROL", rol, modes.ABSOLUTE_X),
        0x40: instruction("RTS", rts, modes.IMPLIED),
        0x41: instruction("EOR", eor, modes.INDIRECT_PRE),
        0x45: instruction("EOR", eor, modes.ZEROPAGE),
        0x48: instruction("PHA", pha, modes.IMPLIED),
        0x49: instruction("EOR", eor, modes.IMMEDIATE),
        0x4A: instruction("LSR", lsr, modes.ACCUMULATOR),
        0x4C: instruction("JMP", jmp, modes.ABSOLUTE),
        0x4D: instruction("EOR", eor, modes.ABSOLUTE),
        0x4E: instruction("LSR", lsr, modes.ABSOLUTE),
        0x50: instruction("BVC", bvc, modes.ABSOLUTE),
        0x51: instruction("EOR", eor, modes.INDIRECT_POST),
        0x55: instruction("EOR", eor, modes.ZEROPAGE_X),
        0x56: instruction("LSR", lsr, modes.ZEROPAGE_X),
        0x58: instruction("CLI", cli, modes.IMPLIED),
        0x59: instruction("EOR", eor, modes.ABSOLUTE_Y),
        0x5d: instruction("EOR", eor, modes.ABSOLUTE_X),
        0x5e: instruction("LSR", lsr, modes.ABSOLUTE_X),
        0x60: instruction("RTS", rts, modes.IMPLIED),
        0x61: instruction("ADC", adc, modes.INDIRECT_PRE),
        0x65: instruction("ADC", adc, modes.ZEROPAGE),
        0x66: instruction("ROR", ror, modes.ZEROPAGE),
        0x68: instruction("PLA", pla, modes.IMPLIED),
        0x69: instruction("ADC", adc, modes.IMMEDIATE),
        0x6a: instruction("ROR", ror, modes.ACCUMULATOR),
        0x6c: instruction("JMP", jmp, modes.INDIRECT),
        0x6d: instruction("ADC", adc, modes.ABSOLUTE),
        0x6e: instruction("ROR", ror, modes.ABSOLUTE),
        0x70: instruction("BVS", bvs, modes.IMPLIED),
        0x71: instruction("ADC", adc, modes.INDIRECT_POST),
        0x75: instruction("ADC", adc, modes.ZEROPAGE_X),
        0x76: instruction("ROR", ror, modes.ZEROPAGE_X),
        0x78: instruction("SEI", sei, modes.IMPLIED),
        0x79: instruction("ADC", adc, modes.ABSOLUTE_Y),
        0x7d: instruction("ADC", adc, modes.ABSOLUTE_X),
        0x7e: instruction("ROR", ror, modes.ABSOLUTE_X),
        0x81: instruction("STA", sta, modes.INDIRECT_PRE),
        0x84: instruction("STY", sty, modes.ZEROPAGE),
        0x85: instruction("STA", sta, modes.ZEROPAGE),
        0x86: instruction("STX", stx, modes.ZEROPAGE),
        0x88: instruction("DEY", dey, modes.IMPLIED),
        0x8a: instruction("TXA", txa, modes.IMPLIED),
        0x8c: instruction("STY", sty, modes.ABSOLUTE),
        0x8d: instruction("STA", sta, modes.ABSOLUTE),
        0x8e: instruction("STX", stx, modes.ABSOLUTE),
        0x90: instruction("BCC", bcc, modes.IMPLIED),
        0x91: instruction("STA", sta, modes.INDIRECT_POST),
        0x94: instruction("STY", sty, modes.ZEROPAGE_X),
        0x95: instruction("STA", sta, modes.ZEROPAGE_X),
        0x96: instruction("STX", stx, modes.ZEROPAGE_Y),
        0x98: instruction("TXA", txa, modes.IMPLIED),
        0x99: instruction("STA", sta, modes.ABSOLUTE_Y),
        0x9a: instruction("TXS", txs, modes.IMPLIED),
        0x9d: instruction("STA", sta, modes.ABSOLUTE_X),
        0xa0: instruction("LDY", ldy, modes.IMMEDIATE),
        0xa1: instruction("LDA", lda, modes.INDIRECT_PRE),
        0xa2: instruction("LDX", ldx, modes.IMMEDIATE),
        0xa4: instruction("LDY", ldy, modes.ZEROPAGE),
        0xa5: instruction("LDA", lda, modes.ZEROPAGE),
        0xa6: instruction("LDX", ldx, modes.ZEROPAGE),
        0xa8: instruction("TAY", tay, modes.IMPLIED),
        0xa9: instruction("LDA", lda, modes.IMMEDIATE),
        0xaa: instruction("TAX", tax, modes.IMPLIED),
        0xac: instruction("LDY", ldy, modes.ABSOLUTE),
        0xad: instruction("LDA", lda, modes.ABSOLUTE),
        0xae: instruction("LDX", ldx, modes.ABSOLUTE),
        0xb0: instruction("BCS", bcs, modes.RELATIVE),
        0xb1: instruction("LDA", lda, modes.INDIRECT_POST),
        0xb4: instruction("LDY", ldy, modes.ZEROPAGE_X),
        0xb5: instruction("LDA", lda, modes.ZEROPAGE_X),
        0xb6: instruction("LDX", ldx, modes.ZEROPAGE_Y),
        0xb8: instruction("CLV", clv, modes.IMPLIED),
        0xb9: instruction("LDA", lda, modes.ABSOLUTE_Y),
        0xba: instruction("TSX", tsx, modes.IMPLIED),
        0xbc: instruction("LDY", ldy, modes.ABSOLUTE_X),
        0xbd: instruction("LDA", lda, modes.ABSOLUTE_X),
        0xbe: instruction("LDX", ldx, modes.ABSOLUTE_Y),
        0xc0: instruction("CPY", cpy, modes.IMMEDIATE),
        0xc1: instruction("CMP", cmp, modes.INDIRECT_PRE),
        0xc4: instruction("CPY", cpy, modes.ZEROPAGE),
        0xc5: instruction("CMP", cmp, modes.ZEROPAGE),
        0xc6: instruction("DEC", dec, modes.ZEROPAGE),
        0xc8: instruction("INY", iny, modes.IMPLIED),
        0xc9: instruction("CMP", cmp, modes.IMMEDIATE),
        0xca: instruction("DEX", dex, modes.IMPLIED),
        0xcc: instruction("CPY", cpy, modes.ABSOLUTE),
        0xcd: instruction("CMP", cmp, modes.ABSOLUTE),
        0xce: instruction("DEC", dec, modes.ABSOLUTE),
        0xd0: instruction("BNE", bne, modes.RELATIVE),
        0xd1: instruction("CMP", cmp, modes.INDIRECT_POST),
        0xd5: instruction("CMP", cmp, modes.ZEROPAGE_X),
        0xd6: instruction("DEC", dec, modes.ZEROPAGE_X),
        0xd8: instruction("CLD", cld, modes.IMPLIED),
        0xd9: instruction("CMP", cmp, modes.ABSOLUTE_Y),
        0xdd: instruction("CMP", cmp, modes.ABSOLUTE_X),
        0xde: instruction("DEC", dec, modes.ABSOLUTE_X),
        0xe0: instruction("CPX", cpx, modes.IMMEDIATE),
        0xe1: instruction("SBC", sbc, modes.INDIRECT_PRE),
        0xe4: instruction("CPX", cpx, modes.ZEROPAGE),
        0xe5: instruction("SBC", sbc, modes.ZEROPAGE),
        0xe6: instruction("INC", inc, modes.ZEROPAGE),
        0xe8: instruction("INX", inx, modes.IMPLIED),
        0xe9: instruction("SBC", sbc, modes.IMMEDIATE),
        0xea: instruction("NOP", nop, modes.IMPLIED),
        0xec: instruction("CPX", cpx, modes.ABSOLUTE),
        0xed: instruction("SBC", sbc, modes.ABSOLUTE),
        0xee: instruction("INC", inc, modes.ABSOLUTE),
        0xf0: instruction("BEQ", beq, modes.RELATIVE),
        0xf1: instruction("SBC", sbc, modes.INDIRECT_POST),
        0xf5: instruction("SBC", sbc, modes.ZEROPAGE),
        0xf6: instruction("INC", inc, modes.ZEROPAGE_X),
        0xf8: instruction("SED", sed, modes.IMPLIED),
        0xf9: instruction("SBC", sbc, modes.ABSOLUTE_Y),
        0xfd: instruction("SBC", sbc, modes.ABSOLUTE_X),
        0xfe: instruction("INC", inc, modes.ABSOLUTE_X)
        //etc.
    };

    

    var nmiTriggered, irqTriggered, resetTriggered;

    
    var getAddress = function(at){
        var lsb = memory.get(at);
        var msb = memory.get(at+1);
        return (msb << 8) | lsb;
    };

    var packStatus = function () {
        return (negative << 7) |
                (overflow << 6) |
                (inBreak << 4) |
                (disableInterupt << 2) |
                (zero << 1) | carry;
    };

    var unpackStatus = function (p) {
        negative = p & 0x80;
        overflow = p & 0x40;
        inBreak = p & 0x10;
        disableInterupt = p & 0x2;
        zero = p & 0x1;
    };

    var push = function (val) {
        memory.set(0x100 + sp, val);
        sp--;
    }

    var pop = function () {
        sp++;
        return memory.get(0x100 + sp);
    }

    var hiByte = function (short) {
        return (short & 0xFF00) >> 8;
    }

    var loByte = function (short) {
        return (short & 0xFF);
    }

    //public
    return {
        create: function () {

        },
        execute: function () {
            if (resetTriggered || nmiTriggered || (irqTriggered && !disableInterupt)) {
                //push pc and status register on the stack
                push(loByte(pc));
                push(hiByte(pc));
                push(packStatus());
                //disable interupts
                disableInterupt = true;
                //jump to the address specified for this type of interupt
                if (resetTriggered) pc = memory.get(getAddress(0xfffc));
                else if (nmiTriggered) pc = memory.get(getAddress(0xfffa));
                else if (irqTriggered) pc = memory.get(getAddress(0xfffe));
            }
            resetTriggered = false; nmiTriggered = false; irqTriggered = false;
            //Fetch next opcode
            var instr = instrs[memory.get(pc++)];
            var len = lengths[instr.mode];
            console.log(instr.name);
            console.log(instr);
            //Execute the instruction, return the number of CPU cycles
            if (len == 1) return instr.f(instr.mode);
            else if (len == 2) return instr.f(instr.mode, memory.get(pc++));
            else if (len == 3) return instr.f(instr.mode, memory.get(pc++), memory.get(pc++));

        },
        setCartridge: function (c) {
        }

    };
};