export interface State {
    _combatQueue: Array<{entityId: EntityId, otherEntityId: EntityId}>,
    _despawnQueue: Array<EntityId>,
    _energyQueue: Array<{entityId: EntityId, energyDelta: number}>
    _eventSubscribers: object,
    _idManager: {
        nextId: number,
        usedIds: Set<number>,
        freeIds: Array<number>
    },
    _menuOpen: boolean,
    actionLog: Array<string>,
    chatLog: Array<string>,
    currentMapId: string,
    cache: {
        entitiesByMap: { [mapId: string]: Set<EntityId> };
        entitiesByLocation: { [locationKey: string]: Set<EntityId> };
    },
    effects: object,
    entities: { [entityId: EntityId]: boolean },
    lastSpacePositionByEntity: object,
    maps: object,
    rng: RNG,
    components: {
        ai: ComponentStore<AIComponent>;
        collision: ComponentStore<CollisionComponent>;
        currency: ComponentStore<CurrencyComponent>;
        dialog: ComponentStore<DialogComponent>;
        energy: ComponentStore<EnergyComponent>;
        faction: ComponentStore<FactionComponent>;
        interaction: ComponentStore<InteractionComponent>;
        inventory: ComponentStore<InventoryComponent>;
        name: ComponentStore<NameComponent>;
        pickupable: ComponentStore<PickupableComponent>;
        position: ComponentStore<PositionComponent>;
        type: ComponentStore<TypeComponent>;
    }
}

export function states_create(): State {
    return {
        _combatQueue: [],
        _despawnQueue: [],
        _energyQueue: [],
        _eventSubscribers: {},
        _idManager: {
            nextId: 1,
            usedIds: new Set(),
            freeIds: []
        },
        _menuOpen: true,
        actionLog: [],
        chatLog: [],
        currentMapId: "",
        cache: {
            entitiesByMap: {},
            entitiesByLocation: {}
        },
        effects: {},
        entities: {},
        lastSpacePositionByEntity: {},
        maps: {},
        rng: new RNG(),
        components: {
            ai: {},
            collision: {},
            currency: {},
            dialog: {},
            energy: {},
            faction: {},
            interaction: {},
            inventory: {},
            name: {},
            pickupable: {},
            position: {},
            type: {}
        }
    }
}
