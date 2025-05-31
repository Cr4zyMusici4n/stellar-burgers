import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI, Preloader } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { getOrderModalData, getOrderRequest, selectIsAuth } from '@selectors';
import { sendOrder } from '../../services/slices/order';
import { clearConstructor } from '../../services/slices/constructor';
import { useNavigate } from 'react-router-dom';
import {
  clearOrderRequest,
  clearOrderModalData
} from '../../services/slices/order';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector((state) => state.burgerConstructor);
  const orderRequest = useSelector(getOrderRequest);
  const orderModalData = useSelector(getOrderModalData);
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (orderRequest) {
      return <Preloader />;
    }

    if (!isAuth) {
      return navigate('/login');
    }

    const data = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id),
      constructorItems.bun._id
    ];
    dispatch(sendOrder(data));
    dispatch(clearConstructor());
  };

  const closeOrderModal = () => {
    dispatch(clearOrderRequest());
    dispatch(clearOrderModalData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
