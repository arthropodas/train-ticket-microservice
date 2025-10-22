package com.example.train_service.enums;

public enum TRAINTYPE {

    EXPRESS((byte) 0),
    PASSENGER((byte) 1),
    SUPERFAST((byte) 2);
    public final byte value;

    TRAINTYPE(byte value) {
        this.value = value;
    }
}
